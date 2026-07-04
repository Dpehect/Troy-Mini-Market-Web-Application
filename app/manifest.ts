import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "Troy Mini Market", short_name: "Troy Market", description: "Local groceries, beautifully simplified.", start_url: "/", display: "standalone", background_color: "#f8f3e8", theme_color: "#1d6048", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] }; }
