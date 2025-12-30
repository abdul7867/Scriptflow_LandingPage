import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
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
        {/* Ambient Spotlights */}
        <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
        <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-orange-900/15 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />
        
        {children}
      </body>
    </html>
  );
}
