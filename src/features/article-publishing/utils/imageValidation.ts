export const IMAGE_VALIDATION_CONFIG = {
    maxSizeBytes: 5 * 1024 * 1024,
    maxWidth: 6000,
    maxHeight: 6000,
    minWidth: 10,
    minHeight: 10,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"] as const,
};

/**
 We need global error handling.  We need to use toast in the mentioned global error handling
 */

type AllowedType = (typeof IMAGE_VALIDATION_CONFIG.allowedTypes)[number];

const SIGNATURES: Record<AllowedType, number[][]> = {
    "image/jpeg": [[0xff, 0xd8, 0xff]],
    "image/png": [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
    "image/webp": [[0x52, 0x49, 0x46, 0x46]],
    "image/gif": [
        [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
        [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
    ],
};

export interface ImageValidationResult {
    valid: boolean;
    error?: string;
    dimensions?: { width: number; height: number };
}

async function readMagicBytes(file: File, length = 12): Promise<Uint8Array> {
    const slice = file.slice(0, length);
    const buffer = await slice.arrayBuffer();
    return new Uint8Array(buffer);
}

function matchesSignature(bytes: Uint8Array, signature: number[]): boolean {
    return signature.every((b, i) => bytes[i] === b);
}

async function detectRealType(file: File): Promise<AllowedType | null> {
    const bytes = await readMagicBytes(file);

    for (const [type, signatures] of Object.entries(SIGNATURES) as [AllowedType, number[][]][]) {
        if (signatures.some((sig) => matchesSignature(bytes, sig))) {
            if (type === "image/webp") {
                const webpTag = String.fromCharCode(...bytes.slice(8, 12));
                if (webpTag !== "WEBP") continue;
            }
            return type;
        }
    }
    return null;
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("corrupt-image"));
        };
        img.src = url;
    });
}

export async function validateImageFile(file: File): Promise<ImageValidationResult> {
    const { maxSizeBytes, maxWidth, maxHeight, minWidth, minHeight, allowedTypes } =
        IMAGE_VALIDATION_CONFIG;

    if (file.size === 0) {
        return { valid: false, error: "File is empty" };
    }

    if (file.size > maxSizeBytes) {
        return { valid: false, error: `File size must not exceed ${maxSizeBytes / 1024 / 1024}MB` };
    }

    const realType = await detectRealType(file);
    if (!realType || !allowedTypes.includes(realType)) {
        return { valid: false, error: "File format is not allowed (only JPG, PNG, WEBP, GIF)" };
    }

    if (file.type && file.type !== realType) {
        return { valid: false, error: "File type does not match its actual content" };
    }

    let dimensions: { width: number; height: number };
    try {
        dimensions = await getImageDimensions(file);
    } catch {
        return { valid: false, error: "Image file is corrupted or unreadable" };
    }

    if (dimensions.width < minWidth || dimensions.height < minHeight) {
        return { valid: false, error: "Image dimensions are too small" };
    }

    if (dimensions.width > maxWidth || dimensions.height > maxHeight) {
        return { valid: false, error: `Image dimensions must not exceed ${maxWidth}×${maxHeight}` };
    }

    return { valid: true, dimensions };
}

export function validateImageUrl(url: string): Promise<{ valid: boolean; error?: string }> {
    return new Promise((resolve) => {
        try {
            new URL(url);
        } catch {
            resolve({ valid: false, error: "Invalid URL" });
            return;
        }

        const img = new Image();
        const timeout = setTimeout(() => {
            resolve({ valid: false, error: "Image loading took too long" });
        }, 8000);

        img.onload = () => {
            clearTimeout(timeout);
            resolve({ valid: true });
        };
        img.onerror = () => {
            clearTimeout(timeout);
            resolve({ valid: false, error: "This URL does not return a valid image" });
        };
        img.src = url;
    });
}