import type { Metadata } from "next";
import "./globals.css";

import {
  Ubuntu_Mono,
  Inconsolata,
  Playfair_Display,
  JetBrains_Mono,
} from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/utils/Providers";

export const metadata: Metadata = {
  title: "Public Thread",
  description:
    "A platform to connect and collaborate with like-minded individuals on shared projects and interests.",
};

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



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inconsolata.variable} ${ubuntu.variable} `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}