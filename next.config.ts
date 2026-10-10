import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fflgxdlrvsxvwzz5.public.blob.vercel-storage.com',
            },
        ],
    },
};

export default nextConfig;