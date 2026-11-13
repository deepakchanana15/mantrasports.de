import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db/prisma'

// Revalidate the sitemap every 24 hours (ISR)
export const revalidate = 86400

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://www.mantrasports.de'

/**
 * Dynamic XML Sitemap — generated at request time (ISR-friendly).
 *
 * Includes:
 *  - Static public pages that actually exist as route files
 *  - All ACTIVE products   → /shop/[slug]
 *  - All categories        → /categories/[slug]
 *  - All collections       → /collections/[slug]
 *
 * Excludes:
 *  - Admin routes  (/admin/*)
 *  - API routes    (/api/*)
 *  - Auth routes   (/api/auth/*)
 *  - 404 / error pages
 *  - Pages referenced in nav config that have no route file yet
 *    (blog, faq, about, b2b, become-a-dealer, shipping-policy,
 *     returns-policy, privacy-policy)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static routes (verified route files exist) ──────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/collections`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/wholesale`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ── Dynamic routes ────────────────────────────────────────────────────────
  let productEntries: MetadataRoute.Sitemap = []
  let categoryEntries: MetadataRoute.Sitemap = []
  let collectionEntries: MetadataRoute.Sitemap = []

  try {
    const [products, categories, collections] = await Promise.all([
      // Only index publicly visible, active products
      prisma.product.findMany({
        where: { status: 'ACTIVE' },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
      }),

      // All categories (they have their own route even if empty)
      prisma.category.findMany({
        select: { slug: true },
        orderBy: { sortOrder: 'asc' },
      }),

      // All collections
      prisma.collection.findMany({
        select: { slug: true },
        orderBy: { sortOrder: 'asc' },
      }),
    ])

    productEntries = products.map((p) => ({
      url: `${BASE_URL}/shop/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    categoryEntries = categories.map((c) => ({
      url: `${BASE_URL}/categories/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    collectionEntries = collections.map((c) => ({
      url: `${BASE_URL}/collections/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    // Database unavailable — return static routes only.
    // The sitemap will still be valid; dynamic entries will be added
    // once the DB is reachable.
    console.warn('[sitemap] Database unavailable — returning static routes only.')
  }

  return [
    ...staticRoutes,
    ...categoryEntries,
    ...collectionEntries,
    ...productEntries,
  ]
}
