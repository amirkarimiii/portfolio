import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
    allowedDevOrigins: [
        "192.168.1.*",
        "localhost",
        "127.0.0.1",
        "10.31.197.*"
    ],
};

export default nextConfig;