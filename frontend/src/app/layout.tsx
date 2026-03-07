import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Public Thread",
  description: "A platform to connect and collaborate with like-minded individuals on shared projects and interests.",
};

import { Ubuntu_Mono, Inconsolata , Playfair_Display, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const ubuntu = Ubuntu_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ubuntu",
  display: "swap",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: "500",  
  variable: "--font-inconsolata",
  display: "swap",
});

const syne = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-syne",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-mono", jetbrainsMono.variable)}>
      <body
        className={` ${inconsolata.variable} ${ubuntu.variable} ${syne.variable} `}
      >
        {children}
      </body>
    </html>
  );
}
