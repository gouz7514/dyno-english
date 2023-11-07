import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/profile", "/study"]
    },
    sitemap: "https://dynoenglish.com/sitemap.xml",
  }
}