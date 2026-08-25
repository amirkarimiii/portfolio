import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
    allowedDevOrigins: [
        "192.168.1.*",
        "localhost",
        "127.0.0.1",
        "10.*.*.*"
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.example.com',
            },
            {
                protocol: 'https',
                hostname: 'fflgxdlrvsxvwzz5.public.blob.vercel-storage.com',
            },
        ],
    },
};

export default nextConfig;