"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  FileText,
  Globe,
  Loader2,
  Megaphone,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { defaultSiteContent, type SiteContent } from "@/lib/siteContent";
import {
  createEmptyBlogPost,
  defaultManagedBlogs,
  type ManagedBlogPost,
} from "@/lib/blogStore";
import { mergeSiteContent } from "@/lib/contentMapper";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { refreshManagedBlogsFromApi } from "@/lib/useManagedBlogs";
import { refreshSiteContentFromApi } from "@/lib/useSiteContent";

const pageMeta: {
  key: keyof SiteContent;
  label: string;
  description: string;
}[] = [
  { key: "home", label: "Home Page", description: "Homepage hero, comparison, and blog section placeholders." },
  { key: "residentialFinance", label: "Residential Finance", description: "Residential page headings and core section titles." },
  { key: "commercialFinance", label: "Commercial Finance", description: "Commercial page hero and section headings." },
  { key: "nonResidentFinance", label: "Non-Resident Finance", description: "Non-resident hero and major section headings." },
  { key: "about", label: "About Page", description: "About hero and key informational section titles." },
  { key: "blog", label: "Blog Page", description: "Blog page hero heading and subtitle." },
  { key: "faq", label: "FAQ Page", description: "FAQ hero heading and subtitle content." },
  {
    key: "contact",
    label: "Contact Page",
    description:
      "Hero, map heading, officeAddressLine1/2, mapQuery (Google embed), supportEmail, officeHoursLine1/2.",
  },
  { key: "footer", label: "Global Footer", description: "Brand name, phone, whatsappNumber (digits only, e.g. 971501234567), hours, and location." },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function uniqueSlug(baseSlug: string, blogs: ManagedBlogPost[]) {
  const normalized = slugify(baseSlug) || "new-blog-post";
  if (!blogs.some((blog) => blog.slug === normalized)) return normalized;
  let counter = 2;
  while (blogs.some((blog) => blog.slug === `${normalized}-${counter}`)) {
    counter += 1;
  }
  return `${normalized}-${counter}`;
}

async function getAdminToken() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return "";
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? "";
}

export default function AdminContentPage() {
  const [selectedPage, setSelectedPage] = useState<keyof SiteContent>("home");
  const [siteContent, setSiteContent] = useState<SiteContent>(() => structuredClone(defaultSiteContent));
  const [blogs, setBlogs] = useState<ManagedBlogPost[]>([]);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      setSaveError("");
      try {
        const token = await getAdminToken();
        if (!token) {
          setSaveError("Admin session missing. Sign in after configuring Supabase env values.");
          setBlogs(defaultManagedBlogs);
          setSelectedBlogSlug(defaultManagedBlogs[0]?.slug ?? "");
          return;
        }
        const [contentRes, blogsRes] = await Promise.all([
          fetch("/api/admin/content", {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          }),
          fetch("/api/admin/blogs", {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          }),
        ]);

        if (contentRes.ok) {
          const contentData = (await contentRes.json()) as { content?: Partial<SiteContent> };
          if (contentData.content) {
            setSiteContent(mergeSiteContent(contentData.content));
          }
        }
        if (blogsRes.ok) {
          const blogsData = (await blogsRes.json()) as { blogs?: ManagedBlogPost[] };
          const nextBlogs = blogsData.blogs?.length ? blogsData.blogs : defaultManagedBlogs;
          setBlogs(nextBlogs);
          setSelectedBlogSlug(nextBlogs[0]?.slug ?? "");
        } else {
          setBlogs(defaultManagedBlogs);
          setSelectedBlogSlug(defaultManagedBlogs[0]?.slug ?? "");
        }
      } finally {
        setLoading(false);
      }
    }

    void loadAdminData();
  }, []);

  const fields = useMemo(
    () =>
      Object.entries(siteContent[selectedPage]) as Array<
        [keyof SiteContent[typeof selectedPage], string]
      >,
    [selectedPage, siteContent]
  );

  const selectedBlog = useMemo(
    () => blogs.find((blog) => blog.slug === selectedBlogSlug) ?? blogs[0],
    [blogs, selectedBlogSlug]
  );

  function updateField(field: string, value: string) {
    setSiteContent((prev) => ({
      ...prev,
      [selectedPage]: {
        ...prev[selectedPage],
        [field]: value,
      },
    }));
  }

  function updateBlog(targetSlug: string, patch: Partial<ManagedBlogPost>) {
    setBlogs((prev) => prev.map((blog) => (blog.slug === targetSlug ? { ...blog, ...patch } : blog)));
  }

  function updateBlogSlug(currentSlug: string, nextSlugInput: string) {
    setBlogs((prev) => {
      const nextSlug = uniqueSlug(nextSlugInput, prev.filter((blog) => blog.slug !== currentSlug));
      setSelectedBlogSlug(nextSlug);
      return prev.map((blog) => (blog.slug === currentSlug ? { ...blog, slug: nextSlug } : blog));
    });
  }

  function createBlog() {
    setBlogs((prev) => {
      const nextSlug = uniqueSlug("new-blog-post", prev);
      const next = [createEmptyBlogPost(nextSlug), ...prev];
      setSelectedBlogSlug(nextSlug);
      return next;
    });
  }

  function deleteBlog(slug: string) {
    setBlogs((prev) => {
      const filtered = prev.filter((blog) => blog.slug !== slug);
      setSelectedBlogSlug(filtered[0]?.slug ?? "");
      return filtered;
    });
  }

  async function saveAll() {
    setSaving(true);
    setSaveError("");
    try {
      const token = await getAdminToken();
      if (!token) {
        throw new Error("Admin session missing. Sign in and try again.");
      }
      const [contentRes, blogsRes] = await Promise.all([
        fetch("/api/admin/content", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: siteContent }),
        }),
        fetch("/api/admin/blogs", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ blogs }),
        }),
      ]);
      if (!contentRes.ok || !blogsRes.ok) {
        const contentErr = !contentRes.ok ? await contentRes.text() : "";
        const blogsErr = !blogsRes.ok ? await blogsRes.text() : "";
        throw new Error(contentErr || blogsErr || "Failed to save data.");
      }
      await Promise.all([refreshSiteContentFromApi(), refreshManagedBlogsFromApi()]);
      setSaved(true);
      setTimeout(() => setSaved(false), 1400);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-muted-foreground inline-flex items-center gap-2">
        <Loader2 className="size-4 animate-spin" />
        Loading content studio...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Content Studio</h2>
          <p className="text-muted-foreground">
            Edit all major page sections and fully manage blog content.
          </p>
        </div>
        <button
          onClick={saveAll}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {saved && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-700 text-sm inline-flex items-center gap-2">
          <CheckCircle2 className="size-4" />
          Saved successfully. Content and blog data are now updated.
        </div>
      )}
      {saveError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-700 text-sm">
          {saveError}
        </div>
      )}

      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Globe className="size-4 text-primary" />
            Edit Content
          </h3>
          <div className="space-y-2 max-h-[620px] overflow-auto">
            {pageMeta.map((page) => (
              <button
                key={page.key}
                onClick={() => setSelectedPage(page.key)}
                className={`w-full text-left rounded-xl px-3 py-3 border transition-colors ${
                  selectedPage === page.key
                    ? "border-primary/40 bg-primary/10"
                    : "border-border hover:border-primary/20"
                }`}
              >
                <p className="font-medium text-sm">{page.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{page.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
          <h3 className="font-semibold text-lg mb-5">
            {pageMeta.find((p) => p.key === selectedPage)?.label} Placeholders
          </h3>
          <div className="grid gap-4 max-h-[620px] overflow-auto pr-1">
            {fields.map(([field, value]) => (
              <div key={String(field)}>
                <label className="block text-sm font-medium mb-2 capitalize">
                  {String(field).replace(/([A-Z])/g, " $1")}
                </label>
                <textarea
                  value={value}
                  onChange={(e) => updateField(String(field), e.target.value)}
                  className="w-full min-h-[82px] px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 md:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Megaphone className="size-4 text-primary" />
            Blog Manager
          </h3>
          <button
            onClick={createBlog}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="size-4" />
            Create New Blog
          </button>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-5">
          <div className="space-y-2 max-h-[560px] overflow-auto pr-1">
            {blogs.map((post) => (
              <button
                key={post.slug}
                onClick={() => setSelectedBlogSlug(post.slug)}
                className={`w-full text-left rounded-xl border px-3 py-3 transition-colors ${
                  selectedBlog?.slug === post.slug
                    ? "border-primary/40 bg-primary/10"
                    : "border-border hover:border-primary/20"
                }`}
              >
                <p className="text-sm font-semibold line-clamp-1">{post.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-1">/blog/{post.slug}</p>
                <p className="text-[11px] mt-2">{post.published ? "Published" : "Draft"} - {post.publishedAt}</p>
              </button>
            ))}
            {blogs.length === 0 && (
              <div className="rounded-xl border border-border px-3 py-4 text-sm text-muted-foreground">
                No blogs found. Create your first blog post.
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border p-4 md:p-5 space-y-4">
            {selectedBlog ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-sm">Editing Blog Post</p>
                  <button
                    onClick={() => deleteBlog(selectedBlog.slug)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-red-500/30 text-red-600 text-xs hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Title</label>
                    <input
                      value={selectedBlog.title}
                      onChange={(e) => updateBlog(selectedBlog.slug, { title: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Slug</label>
                    <input
                      value={selectedBlog.slug}
                      onChange={(e) => updateBlogSlug(selectedBlog.slug, e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Excerpt</label>
                  <textarea
                    value={selectedBlog.excerpt}
                    onChange={(e) => updateBlog(selectedBlog.slug, { excerpt: e.target.value })}
                    className="w-full min-h-[72px] px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-y"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Category</label>
                    <input
                      value={selectedBlog.category}
                      onChange={(e) => updateBlog(selectedBlog.slug, { category: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Read Time</label>
                    <input
                      value={selectedBlog.readTime}
                      onChange={(e) => updateBlog(selectedBlog.slug, { readTime: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Publish Date</label>
                    <input
                      type="date"
                      value={selectedBlog.publishedAt}
                      onChange={(e) => updateBlog(selectedBlog.slug, { publishedAt: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <label className="inline-flex items-center gap-2 text-sm pt-6">
                    <input
                      type="checkbox"
                      checked={selectedBlog.published}
                      onChange={(e) => updateBlog(selectedBlog.slug, { published: e.target.checked })}
                    />
                    Published
                  </label>
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Image URL</label>
                  <input
                    value={selectedBlog.image}
                    onChange={(e) => updateBlog(selectedBlog.slug, { image: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Keywords</label>
                  <input
                    value={selectedBlog.keywords}
                    onChange={(e) => updateBlog(selectedBlog.slug, { keywords: e.target.value })}
                    placeholder="dubai mortgage, uae home loan..."
                    className="w-full h-10 px-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Blog Content (one paragraph per line)</label>
                  <textarea
                    value={selectedBlog.content.join("\n")}
                    onChange={(e) =>
                      updateBlog(selectedBlog.slug, {
                        content: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean),
                      })
                    }
                    className="w-full min-h-[180px] px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-y"
                  />
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">Select or create a blog post to edit.</div>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <FileText className="size-3.5" />
          Blog list, homepage cards, and blog detail pages are all driven by this manager.
        </p>
      </div>
    </div>
  );
}
