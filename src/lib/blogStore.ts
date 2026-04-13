import { blogPosts, type BlogPost } from "@/lib/blog";

export type ManagedBlogPost = BlogPost & {
  published: boolean;
  keywords: string;
};

export const EMPTY_BLOG_CONTENT_LINE =
  "Add your blog content paragraph here.";

export function normalizeManagedBlogs(posts: BlogPost[]): ManagedBlogPost[] {
  return posts.map((post) => ({
    ...post,
    published: true,
    keywords: "",
  }));
}

export function createEmptyBlogPost(nextSlug: string): ManagedBlogPost {
  return {
    slug: nextSlug,
    title: "New Blog Post",
    excerpt: "Add a short blog summary for cards and previews.",
    category: "Guides",
    readTime: "4 min read",
    publishedAt: new Date().toISOString().slice(0, 10),
    image:
      "https://res.cloudinary.com/dxfejax3u/image/upload/v1772461444/WhatsApp_Image_2026-03-02_at_7.23.22_PM_ryhhbi.jpg",
    content: [EMPTY_BLOG_CONTENT_LINE],
    published: false,
    keywords: "",
  };
}

export const defaultManagedBlogs = normalizeManagedBlogs(blogPosts);
