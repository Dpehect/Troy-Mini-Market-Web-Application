import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { Toaster } from "@/components/ui/sonner";
import { ClientProviders } from "@/components/providers/client-providers";
import { SkipLink } from "@/components/shared/skip-link";
import { MobileCartCta } from "@/components/shared/mobile-cart-cta";
export const metadata: Metadata = { title: { default: "Troy Mini Market | Local groceries, beautifully simplified.", template: "%s | Troy Mini Market" }, description: "Fresh groceries, deli favorites, pantry staples, snacks, drinks, and household essentials ready for pickup or delivery in Troy.", metadataBase: new URL("https://troy-mini-market.local"), applicationName: "Troy Mini Market", keywords: ["grocery", "local market", "deli", "Troy", "delivery", "pickup", "fresh produce"], openGraph: { title: "Troy Mini Market", description: "Local groceries, beautifully simplified.", type: "website", locale: "en_US", siteName: "Troy Mini Market" }, twitter: { card: "summary_large_image", title: "Troy Mini Market", description: "Local groceries, beautifully simplified." }, robots: { index: true, follow: true }, manifest: "/manifest.webmanifest" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1, themeColor: "#1d6048" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className="min-h-screen bg-background font-sans text-foreground antialiased"><ClientProviders><SkipLink /><AnnouncementBar /><SiteHeader /><main id="main-content" className="pb-28 md:pb-0" tabIndex={-1}>{children}</main><SiteFooter /><MobileCartCta /><MobileBottomNav /><Toaster richColors position="top-center" /></ClientProviders></body></html>; }
