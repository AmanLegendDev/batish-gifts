export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        disallow: [
          "/admin",
          "/api",
          "/cart",
          "/checkout"
        ]
      }
    ],

    sitemap:
      "https://www.aaravgiftgallery.com/sitemap.xml",

    host:
      "https://www.aaravgiftgallery.com"
  };
}