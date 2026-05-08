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
    default: "Aarav Gift Gallery | Gift Shop in Shimla",
    template: "%s | Aarav Gift Gallery"
  },

  description:
"Best gift shop in Shimla for birthday gifts, custom gifts, hampers, perfumes, handmade gifts, toys and surprise boxes. Aarav Gift Gallery Panthaghati.",

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

  verification: {
  google: "abc123xyz"
},


 metadataBase: new URL(
  "https://www.aaravgiftgallery.com"
),

  robots: {
  index: true,
  follow: true
},



  openGraph: {

    title: "Aarav Gift Gallery",

    description:
      "Unique gifts, hampers & surprise boxes crafted for special moments 💝",

    url: "https://www.aaravgiftgallery.com",

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



};

export default function RootLayout({ children }) {

  const localBusinessSchema = {
  "@context": "https://schema.org",

  "@type": "GiftShop",

  name: "Aarav Gift Gallery",

  image:
    "https://www.aaravgiftgallery.com/og.jpg",

  url:
    "https://www.aaravgiftgallery.com",

  telephone:
    "+91 9459365278",

  address: {

    "@type": "PostalAddress",

    addressLocality: "Shimla",

    addressRegion: "Himachal Pradesh",

    postalCode: "171009",

    addressCountry: "IN"

  },

  areaServed: [
    "Shimla",
    "Panthaghati",
    "Sanjauli",
    "Dhalli"
  ],

  priceRange: "₹₹",

  description:
    "Gift shop in Shimla offering birthday gifts, custom gifts, hampers, perfumes, toys, handmade gifts and surprise boxes.",

  sameAs: [
    
  ]
};

  return (

    <html lang="en">

      <body
        className={`${inter.variable} ${poppins.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)]`}
      >

        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(localBusinessSchema)
  }}
/>
        

        {children}
        

      </body>

    </html>

  );

}