import Navbar from "@/components/layout/Navbar";
import "./globals.css";

import { Inter, Poppins } from "next/font/google";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","600"],
  variable: "--font-poppins",
});

export const metadata = {

  title: {
    default: "Aarav Gift Gallery",
    template: "%s | Aarav Gift Gallery"
  },

  description:
    "Premium gifts, hampers, surprise boxes, perfumes & custom gifting in Shimla. Order unique gifts easily with Aarav Gift Gallery.",

  keywords: [
    "gift shop shimla",
    "aarav gift gallery",
    "custom gifts",
    "birthday gifts",
    "surprise box",
    "gift hampers",
    "toys",
    "perfumes",
    "romantic gifts",
    "gift store panthaghati"
  ],

  authors: [
    {
      name: "Aman Digital Solution"
    }
  ],

  creator: "Aman Digital Solution",

  metadataBase: new URL(
    "https://aaravgiftgallery.vercel.app"
  ),

  robots: {
  index: true,
  follow: true
},

  openGraph: {

    title: "Aarav Gift Gallery",

    description:
      "Unique gifts, hampers & surprise boxes crafted for special moments 💝",

    url: "https://aaravgiftgallery.vercel.app",

    siteName: "Aarav Gift Gallery",

    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Aarav Gift Gallery"
      }
    ],

    locale: "en_IN",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Aarav Gift Gallery",
    description:
      "Premium gifting experience in Shimla 🎁",
    images: ["/og.jpg"]
  },

  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg"
  }

};

export default function RootLayout({ children }) {

  return (

    <html lang="en">

      <body
        className={`${inter.variable} ${poppins.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)]`}
      >
        

        {children}
        

      </body>

    </html>

  );

}