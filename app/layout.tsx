/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppLayout } from "@/lib/components/layout/AppLayout";
import { companyWebsiteMetaDescription, companyWebsiteMetaTitle } from "@/api/constants/website";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: companyWebsiteMetaTitle,
  description: companyWebsiteMetaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body className="min-h-full">
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
