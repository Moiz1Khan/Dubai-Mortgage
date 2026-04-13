"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { useManagedBlogs } from "@/lib/useManagedBlogs";
import { useSiteContentSection } from "@/lib/useSiteContent";

export default function BlogPage() {
  const blogContent = useSiteContentSection("blog");
  const publishedPosts = useManagedBlogs().filter((post) => post.published);
  const featured = publishedPosts[0];
  const rest = publishedPosts.slice(1);

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <section className="pt-32 md:pt-40 pb-12 bg-[#22334d]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              {blogContent.heroTitle}
            </h1>
            <p className="text-white/80 text-center max-w-2xl mx-auto">
              {blogContent.heroSubtitle}
            </p>
          </div>
        </section>

        <div className="theme-gradient">
          <section className="py-10 md:py-14">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              {featured ? (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="grid lg:grid-cols-2 gap-8 items-center rounded-3xl border border-border bg-card p-4 md:p-6 hover:border-primary/40 transition-colors"
                >
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                    <Image src={featured.image} alt={featured.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary mb-2">{featured.category}</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{featured.title}</h2>
                    <p className="text-muted-foreground mb-4">{featured.excerpt}</p>
                    <p className="text-sm text-muted-foreground">{featured.readTime}</p>
                  </div>
                </Link>
              ) : (
                <div className="rounded-3xl border border-border bg-card p-8 text-center text-muted-foreground">
                  No published blogs yet. Publish posts from Admin Content Studio.
                </div>
              )}
            </div>
          </section>

          <section className="pb-14">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold text-primary mb-2">{post.category}</p>
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </>
  );
}
