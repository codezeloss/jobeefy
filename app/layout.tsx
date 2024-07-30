import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Jobeefy | Online Job Portal",
  description: "The only & the best Job Portal you're looking for!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
