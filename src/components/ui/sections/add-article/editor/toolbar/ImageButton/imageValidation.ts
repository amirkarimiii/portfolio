export const IMAGE_VALIDATION_CONFIG = {
    maxSizeBytes: 5 * 1024 * 1024,
    maxWidth: 6000,
    maxHeight: 6000,
    minWidth: 10,
    minHeight: 10,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"] as const,
};
