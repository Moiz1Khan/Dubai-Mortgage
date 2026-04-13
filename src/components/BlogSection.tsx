"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogGrid } from "./BlogGrid";
import { WhoWeHelpTopLeftAccent } from "@/components/WhoWeHelpImageAccents";
import { blogPosts } from "@/lib/blog";
import { useSiteContentSection } from "@/lib/useSiteContent";

export function BlogSection() {
  const content = useSiteContentSection("home");
  return (
    <section className="py-10 md:py-14 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {content.blogTitle}
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          {content.blogSubtitle}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_1fr] gap-10 lg:gap-12 items-center">
          {/* Left: Stylish image (smaller) */}
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            className="relative isolate order-1 block lg:order-1 lg:max-w-[360px]"
          >
            {/* Top-left: rates / EIBOR-style motif (was invisible with -z-10) */}
            <div
              className="pointer-events-none absolute -left-4 -top-4 z-0 h-[5.25rem] w-[5.25rem] sm:h-28 sm:w-28"
              aria-hidden
            >
              <div className="flex h-full w-full items-center justify-center rounded-2xl border-2 border-[#c5d0e0] bg-card/95 p-3 shadow-sm backdrop-blur-sm dark:border-slate-600 dark:bg-card/90">
                <WhoWeHelpTopLeftAccent className="h-[4.25rem] w-[4.25rem] sm:h-[5.25rem] sm:w-[5.25rem]" />
              </div>
            </div>

            <div className="relative z-10 aspect-[4/5] max-h-[400px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/[0.06] group lg:max-h-[420px] dark:ring-white/10">
              <Image
                src={blogPosts[0].image}
                alt="First-time buyer guide - Dubai home loans"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-transparent transition-all duration-500 group-hover:ring-primary/40"
                aria-hidden
              />
            </div>
          </Link>

          {/* Right: Bento grid */}
          <div className="order-2 lg:order-2 flex justify-center lg:justify-end">
            <BlogGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
