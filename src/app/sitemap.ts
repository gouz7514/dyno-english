import { MetadataRoute } from "next"

const BASE_URL = "https://dynoenglish.com"

const sitemapUrl = (path: string): string => `${BASE_URL}${path}`

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
    },
    {
      url: sitemapUrl("/intro/map"),
    },
    {
      url: sitemapUrl("/intro/teacher"),
    },
    {
      url: sitemapUrl("/intro/testimonial"),
    }
  ]
}