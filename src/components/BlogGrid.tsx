"use client";

import Link from "next/link";
import { WhoWeHelpBottomRightAccent } from "@/components/WhoWeHelpImageAccents";
import { useManagedBlogs } from "@/lib/useManagedBlogs";
import { cn } from "@/lib/utils";

const cardClass = "flex flex-col justify-between relative w-full p-5 rounded-[20px] border border-border bg-card text-foreground overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(40,48,58,0.1)]";

export function BlogGrid() {
  const published = useManagedBlogs().filter((post) => post.published);
  const cardData = [
    { ...published[0], label: "Guides" },
    { ...published[1], label: "Tips" },
    { ...published[2], label: "Rates" },
    { ...published[3], label: "Market" },
    { ...published[4], label: "Savings" },
    { ...published[5], label: "Refinance" },
  ].filter((entry) => entry.slug);

  if (cardData.length === 0) {
    return (
      <div className="max-w-[54rem] w-full p-6 rounded-[20px] border border-border bg-card text-muted-foreground text-sm">
        No published blog posts yet. Publish posts from Admin Content Studio.
      </div>
    );
  }

  const card = (index: number) => cardData[index] ?? cardData[0];

  return (
    <div className="grid gap-2 sm:gap-3 p-3 max-w-[54rem] w-full grid-cols-1 sm:grid-cols-3"
      style={{ gridTemplateRows: "repeat(4, minmax(90px, 1fr))" }}>
      {/* Large: First-Time Buyer - 2 cols × 2 rows */}
      <Link href={`/blog/${card(0).slug}`} className={`${cardClass} col-span-2 row-span-2 min-h-[160px] sm:min-h-[200px]`}>
        <span className="text-sm font-medium text-muted-foreground">{card(0).label}</span>
        <div className="flex flex-col flex-1 mt-2">
          <h3 className="font-semibold text-base sm:text-lg line-clamp-1">{card(0).title}</h3>
          <p className="text-sm leading-5 text-muted-foreground line-clamp-3 mt-1">{card(0).excerpt}</p>
        </div>
      </Link>
      {/* Small: Self-Employed */}
      <Link href={`/blog/${card(1).slug}`} className={`${cardClass} min-h-[80px]`}>
        <span className="text-xs font-medium text-muted-foreground">{card(1).label}</span>
        <h3 className="font-semibold text-sm mt-0.5 line-clamp-1">{card(1).title}</h3>
        <p className="text-xs leading-4 text-muted-foreground line-clamp-2 mt-0.5">{card(1).excerpt}</p>
      </Link>
      {/* Small: Fixed vs Variable */}
      <Link href={`/blog/${card(2).slug}`} className={`${cardClass} min-h-[80px]`}>
        <span className="text-xs font-medium text-muted-foreground">{card(2).label}</span>
        <h3 className="font-semibold text-sm mt-0.5 line-clamp-1">{card(2).title}</h3>
        <p className="text-xs leading-4 text-muted-foreground line-clamp-2 mt-0.5">{card(2).excerpt}</p>
      </Link>
      {/* Medium: Down Payment - spans 2 cols */}
      <Link href={`/blog/${card(4).slug}`} className={`${cardClass} col-span-2 min-h-[80px]`}>
        <span className="text-xs font-medium text-muted-foreground">{card(4).label}</span>
        <h3 className="font-semibold text-sm mt-0.5 line-clamp-1">{card(4).title}</h3>
        <p className="text-sm leading-4 text-muted-foreground line-clamp-2 mt-0.5">{card(4).excerpt}</p>
      </Link>
      {/* Small: Dubai Market */}
      <Link href={`/blog/${card(3).slug}`} className={`${cardClass} min-h-[80px]`}>
        <span className="text-xs font-medium text-muted-foreground">{card(3).label}</span>
        <h3 className="font-semibold text-sm mt-0.5 line-clamp-1">{card(3).title}</h3>
        <p className="text-xs leading-4 text-muted-foreground line-clamp-2 mt-0.5">{card(3).excerpt}</p>
      </Link>
      {/* Medium: Refinancing - spans 2 cols; bottom-right mortgage accent */}
      <Link
        href={`/blog/${card(5).slug}`}
        className={cn(
          cardClass,
          "relative col-span-2 min-h-[80px] !overflow-visible",
        )}
      >
        <div
          className="pointer-events-none absolute -bottom-3 -right-3 z-0 h-[4.75rem] w-[4.75rem] sm:h-[5.5rem] sm:w-[5.5rem]"
          aria-hidden
        >
          <div className="flex h-full w-full items-center justify-center rounded-2xl border border-border bg-card/95 p-2.5 shadow-sm backdrop-blur-sm dark:bg-card/90">
            <WhoWeHelpBottomRightAccent className="h-full w-full" />
          </div>
        </div>
        <div className="relative z-[1] flex min-h-0 flex-1 flex-col justify-between">
          <span className="text-xs font-medium text-muted-foreground">{card(5).label}</span>
          <div className="mt-0.5 flex flex-col">
            <h3 className="line-clamp-1 font-semibold text-sm">{card(5).title}</h3>
            <p className="mt-0.5 line-clamp-2 text-sm leading-4 text-muted-foreground">{card(5).excerpt}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
