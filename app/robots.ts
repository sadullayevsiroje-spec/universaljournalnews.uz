import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Googlebot-Scholar",
        allow: "/",
        crawlDelay: 0,
      },
    ],
    sitemap: "https://universaljournalnews.uz/sitemap.xml",
  };
}