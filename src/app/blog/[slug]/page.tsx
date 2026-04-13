"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { useManagedBlogs } from "@/lib/useManagedBlogs";

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const blogs = useManagedBlogs();
  const post = blogs.find((entry) => entry.slug === params.slug && entry.published);

  if (!post) {
    return (
      <>
        <ScrollProgress />
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              This blog is not published or does not exist.
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <section className="pt-32 md:pt-40 pb-10 bg-[#22334d]">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <p className="text-sm font-semibold text-primary mb-3">{post.category}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <p className="text-white/80">{post.readTime}</p>
          </div>
        </section>

        <div className="theme-gradient">
          <article className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border mb-8">
              <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 900px" />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-base text-foreground/90 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
          <Footer />
        </div>
      </main>
    </>
  );
}
