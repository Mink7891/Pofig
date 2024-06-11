import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/layout/header";
import { ThemeProvider } from "../components/theme/theme-provider";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "TalentLink - Помощник для соискателя и рекрутера",
    template: "%s | TalentLink",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Separator />
          {/* <main className={inter.className}>{children}</main> */}
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
