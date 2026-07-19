export const IMAGE_VALIDATION_CONFIG = {
    maxSizeBytes: 5 * 1024 * 1024,
    maxWidth: 6000,
    maxHeight: 6000,
    minWidth: 10,
    minHeight: 10,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"] as const,
};

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

async function readMagicBytes(file: File, length = 12): Promise<Uint8Array> {
    const slice = file.slice(0, length);
    const buffer = await slice.arrayBuffer();
    return new Uint8Array(buffer);
}

function matchesSignature(bytes: Uint8Array, signature: number[]): boolean {
    return signature.every((b, i) => bytes[i] === b);
}