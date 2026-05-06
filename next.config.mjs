/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {

    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ],

    // ✅ VERCEL DETAIL PAGE FIX
    unoptimized: true

  }

};

export default nextConfig;