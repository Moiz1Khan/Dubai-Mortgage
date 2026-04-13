import { defaultSiteContent, type SiteContent } from "@/lib/siteContent";
import { defaultManagedBlogs, type ManagedBlogPost } from "@/lib/blogStore";

export function mergeSiteContent(parsed: Partial<SiteContent>): SiteContent {
  return {
    home: { ...defaultSiteContent.home, ...parsed.home },
    residentialFinance: {
      ...defaultSiteContent.residentialFinance,
      ...parsed.residentialFinance,
    },
    commercialFinance: {
      ...defaultSiteContent.commercialFinance,
      ...parsed.commercialFinance,
    },
    nonResidentFinance: {
      ...defaultSiteContent.nonResidentFinance,
      ...parsed.nonResidentFinance,
    },
    about: { ...defaultSiteContent.about, ...parsed.about },
    faq: { ...defaultSiteContent.faq, ...parsed.faq },
    contact: { ...defaultSiteContent.contact, ...parsed.contact },
    footer: { ...defaultSiteContent.footer, ...parsed.footer },
    blog: { ...defaultSiteContent.blog, ...parsed.blog },
  };
}

export function mapRowsToSiteContent(
  rows: Array<{ page_key: string; content_json: unknown }>
): SiteContent {
  const partial: Record<string, object> = {};
  for (const row of rows) {
    const pageKey = row.page_key as keyof SiteContent;
    if (pageKey in defaultSiteContent && row.content_json && typeof row.content_json === "object") {
      partial[pageKey as string] = row.content_json as object;
    }
  }
  return mergeSiteContent(partial as Partial<SiteContent>);
}

export function mapRowsToManagedBlogs(
  rows: Array<{
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    read_time: string;
    published_at: string;
    image_url: string;
    content_paragraphs: string[] | null;
    keywords: string | null;
    is_published: boolean;
  }>
): ManagedBlogPost[] {
  if (!rows.length) return defaultManagedBlogs;
  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    readTime: row.read_time,
    publishedAt: row.published_at,
    image: row.image_url,
    content: row.content_paragraphs?.length ? row.content_paragraphs : ["Add your blog content paragraph here."],
    keywords: row.keywords ?? "",
    published: row.is_published,
  }));
}
