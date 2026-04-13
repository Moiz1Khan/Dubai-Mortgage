"use client";

import { useSyncExternalStore } from "react";
import {
  defaultManagedBlogs,
  type ManagedBlogPost,
} from "@/lib/blogStore";

const BLOGS_EVENT = "managed-blogs-updated";
let cachedBlogs: ManagedBlogPost[] = defaultManagedBlogs;
let didInitialFetch = false;

function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(BLOGS_EVENT));
  }
}

async function refreshManagedBlogs() {
  if (typeof window === "undefined") return;
  try {
    const response = await fetch("/api/public/blogs", { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as { blogs?: ManagedBlogPost[] };
    if (!data.blogs) return;
    cachedBlogs = data.blogs;
    notify();
  } catch {
    // Keep fallback blogs when fetch fails.
  }
}

export async function refreshManagedBlogsFromApi() {
  await refreshManagedBlogs();
}

function getSnapshot(): ManagedBlogPost[] {
  if (typeof window !== "undefined" && !didInitialFetch) {
    didInitialFetch = true;
    void refreshManagedBlogs();
  }
  return cachedBlogs;
}

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const localHandler = () => onChange();
  const syncHandler = () => {
    void refreshManagedBlogs();
  };
  window.addEventListener(BLOGS_EVENT, localHandler);
  window.addEventListener("focus", syncHandler);
  window.addEventListener("visibilitychange", syncHandler);
  return () => {
    window.removeEventListener(BLOGS_EVENT, localHandler);
    window.removeEventListener("focus", syncHandler);
    window.removeEventListener("visibilitychange", syncHandler);
  };
}

export function useManagedBlogs() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
