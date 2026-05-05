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
  title: "AARAV GIFTS ",
  description: "Campus midnight delivery in minutes",
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