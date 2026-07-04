import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
const baseUrl = "https://troy-mini-market.local";
export default function sitemap(): MetadataRoute.Sitemap { const staticRoutes = ["", "/shop", "/categories", "/deals", "/recipes", "/cart", "/checkout", "/favorites", "/reorder", "/account", "/about", "/case-study", "/search"]; return [...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.75 })), ...categories.map((category) => ({ url: `${baseUrl}/categories/${category.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 })), ...products.map((product) => ({ url: `${baseUrl}/product/${product.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.55 }))]; }
