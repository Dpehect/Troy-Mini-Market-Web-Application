import type { NextConfig } from "next";
const nextConfig: NextConfig = { images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }], formats: ["image/avif", "image/webp"] }, poweredByHeader: false, compress: true, experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] } };
export default nextConfig;
