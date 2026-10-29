import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GalleryProvider } from "@/components/Gallery";
import { asset, site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SPAIS — Bringing AI into the real world",
    template: "%s — SPAIS",
  },
  description: site.description,
  icons: { icon: asset("brand/favicon.png"), apple: asset("apple-touch-icon.png") },
  openGraph: {
    type: "website",
    siteName: `${site.name} — ${site.fullName}`,
    images: [asset("photos/team-cover-1600.webp")],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed -top-20 left-4 z-[100] rounded bg-white px-4 py-2 text-black focus:top-3"
        >
          Skip to content
        </a>
        <GalleryProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </GalleryProvider>
      </body>
    </html>
  );
}
