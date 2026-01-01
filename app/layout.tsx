import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Instrument_Serif, Playfair_Display, Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import GlobalSpotlight from "@/components/ui/GlobalSpotlight";
import { SignupProvider } from "@/context/SignupContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk",
  weight: "700",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic", "normal"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://scriptflow.app"),
  title: {
    default: "ScriptFlow - Turn Any Viral Video Into Your Next Script",
    template: "%s | ScriptFlow",
  },
  description: "Paste any viral video link. We extract the psychology that made it blow up—and inject it into your idea. Join the first 100 beta creators.",
  keywords: [
    "script generator",
    "viral content",
    "instagram reels",
    "tiktok",
    "youtube shorts",
    "AI",
    "content creator",
    "viral scripts",
    "hook generator",
    "content strategy",
  ],
  authors: [{ name: "Rehman", url: "https://scriptflow.app" }],
  creator: "ScriptFlow",
  publisher: "ScriptFlow",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scriptflow.app",
    siteName: "ScriptFlow",
    title: "ScriptFlow - Turn Any Viral Video Into Your Next Script",
    description: "Paste any viral video link. We extract the psychology that made it blow up—and inject it into your idea. Join 100 beta creators.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ScriptFlow - AI Script Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScriptFlow - Viral Scripts in Seconds",
    description: "Paste any viral video link. We extract the psychology and inject it into your idea.",
    images: ["/og-image.png"],
    creator: "@scriptflow",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${playfairDisplay.variable} ${inter.variable} antialiased bg-canvas text-white relative`}>
        <GlobalSpotlight />
        <SignupProvider>
          {children}
        </SignupProvider>
      </body>
    </html>
  );
}
