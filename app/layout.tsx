import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppLayout } from "@/lib/components/layout/AppLayout";
import { companyWebsiteMetaDescription, companyWebsiteMetaTitle, companyWebsiteDeployUrl } from "@/lib/constants/website";
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

const keywords = ["купити авто акумулятор київ", "купити акумулятор для авто", "акумулятор для авто, батареї", "авто аккумулятор agm", " авто аккумулятор gel", "авто акумулятор гарна ціна, дешево"];
const metatags = {
  "og:title": "Акумулятори для авто, мотоциклів популярних виробників",
  "og:description": "Акумулятори для авто, мотоциклів популярних виробників (Bosch, Ista, Maxion, Forse, Oberon, Moll)",
  "keywords": keywords.reduce((slice, keyword, keywordId) => keywordId === 0 ? slice : slice+=`,${keyword}`, ""),
  "description": "Акумулятори для авто, мотоциклів популярних виробників (Bosch, Ista, Maxion, Forse, Oberon, Moll)",
  "og:url": companyWebsiteDeployUrl,
  "og:locale": "ua",
  "og:site_name": "Акумулятори від виробників, купити у дистрибютора PowerMB",
};

export default function RootLayout({ children }: Readonly<{ children: any }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {Object.keys(metatags).map((tag) => (
          <meta name={tag} content={(metatags as any)[tag]} key={tag} />
        ))}
      </head>
      <body className="min-h-full">
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
