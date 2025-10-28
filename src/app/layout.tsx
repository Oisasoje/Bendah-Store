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

<meta
  name="viewport"
  content="width=device-width, initial-scale=1, minimum-scale=1"
/>;

// In your layout.tsx or page.tsx
export const metadata = {
  title: "Bendah Store - Premium Fashion & Streetwear",
  description:
    "Discover premium fashion at Bendah Store. Shop the latest trends in clothing, shoes and accessories with free shipping and 14-day returns.",
  openGraph: {
    title: "Bendah Store - Premium Fashion",
    description: "Shop the latest fashion trends",
    images: ["/assets/og-image.jpg"],
  },
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
        className={`${geistSans.variable} pt-20 ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
