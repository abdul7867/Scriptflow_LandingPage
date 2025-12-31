import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import GlobalSpotlight from "@/components/ui/GlobalSpotlight";
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

export const metadata: Metadata = {
  title: "ScriptFlow",
  description: "High-fidelity landing page for ScriptFlow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} antialiased bg-canvas text-white relative`}>
        <GlobalSpotlight />

        
        {children}
      </body>
    </html>
  );
}
