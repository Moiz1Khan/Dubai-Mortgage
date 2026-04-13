import { NextResponse } from "next/server";
import { defaultManagedBlogs } from "@/lib/blogStore";
import { getSupabaseAnonServerClient } from "@/lib/supabase/server";
import { mapRowsToManagedBlogs } from "@/lib/contentMapper";

export async function GET() {
  try {
    const supabase = getSupabaseAnonServerClient();
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
