import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"], // Block admin page
    },
    sitemap: "https://www.hooblr.com/sitemap.xml",
  };
}