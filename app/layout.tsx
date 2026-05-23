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
  children: any;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/** something */}
      </head>
      <body className="min-h-full">
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
