import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bendah Store",
  description: "Demo Store Created With Nextjs and Shopify's StoreFrontApi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="preload"
          href="/assets/Footware.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/assets/Lifestyle.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/assets/Fashion.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/assets/Summer.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/assets/Clothing.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/assets/Sports.jpg"
          as="image"
          type="image/jpeg"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
