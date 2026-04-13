"use client";

import { useSyncExternalStore } from "react";
import {
  defaultSiteContent,
  type SiteContent,
} from "@/lib/siteContent";
import { mergeSiteContent } from "@/lib/contentMapper";

const SITE_CONTENT_EVENT = "site-content-updated";
let cachedSnapshot: SiteContent = defaultSiteContent;
let didInitialFetch = false;

function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SITE_CONTENT_EVENT));
  }
}

async function refreshSiteContent() {
  if (typeof window === "undefined") return;
  try {
    const response = await fetch("/api/public/content", { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as { content?: Partial<SiteContent> };
    if (!data.content) return;
    cachedSnapshot = mergeSiteContent(data.content);
    notify();
  } catch {
    // Keep defaults when fetch fails.
  }
}

export async function refreshSiteContentFromApi() {
  await refreshSiteContent();
}

function readSnapshot(): SiteContent {
  if (typeof window !== "undefined" && !didInitialFetch) {
    didInitialFetch = true;
    void refreshSiteContent();
  }
  return cachedSnapshot;
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const localHandler = () => onStoreChange();
  const syncHandler = () => {
    void refreshSiteContent();
  };
  window.addEventListener(SITE_CONTENT_EVENT, localHandler);
  window.addEventListener("focus", syncHandler);
  window.addEventListener("visibilitychange", syncHandler);
  return () => {
    window.removeEventListener(SITE_CONTENT_EVENT, localHandler);
    window.removeEventListener("focus", syncHandler);
    window.removeEventListener("visibilitychange", syncHandler);
  };
}

export function useSiteContentSection<K extends keyof SiteContent>(
  section: K
): SiteContent[K] {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => defaultSiteContent);
  return snapshot[section];
}
