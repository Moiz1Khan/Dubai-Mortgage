import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { defaultManagedBlogs } from "@/lib/blogStore";
import { requireAdminFromRequest } from "@/lib/supabase/auth";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { mapRowsToManagedBlogs } from "@/lib/contentMapper";

const managedBlogSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string(),
  category: z.string().min(1),
  readTime: z.string().min(1),
  publishedAt: z.string().min(1),
  image: z.string().url().or(z.string().startsWith("/")),
  content: z.array(z.string().min(1)).min(1),
  keywords: z.string(),
  published: z.boolean(),
});

const blogsPayloadSchema = z.array(managedBlogSchema);

export async function GET(request: NextRequest) {
  const auth = await requireAdminFromRequest(request);
  if (!auth.ok) return auth.response;

  try {
    const supabase = getSupabaseServiceClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "slug,title,excerpt,category,read_time,published_at,image_url,content_paragraphs,keywords,is_published"
      )
      .order("published_at", { ascending: false });
    if (error) throw error;
    const blogs = mapRowsToManagedBlogs(
      (data ?? []) as Array<{
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
    );
    return NextResponse.json({ blogs });
  } catch {
    return NextResponse.json({ blogs: defaultManagedBlogs });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminFromRequest(request);
  if (!auth.ok) return auth.response;

  const body = await request.json();
  const parseResult = blogsPayloadSchema.safeParse(body?.blogs);
  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid blogs payload." }, { status: 400 });
  }

  const blogs = parseResult.data;
  try {
    const supabase = getSupabaseServiceClient();

    const { error: deleteError } = await supabase
      .from("blog_posts")
      .delete()
      .neq("slug", "__none__");
    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    const rows = blogs.map((blog) => ({
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      read_time: blog.readTime,
      published_at: blog.publishedAt,
      image_url: blog.image,
      content_paragraphs: blog.content,
      keywords: blog.keywords,
      is_published: blog.published,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from("blog_posts").insert(rows);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase not configured." },
      { status: 500 }
    );
  }
}
