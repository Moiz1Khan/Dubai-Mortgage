"use client";

type BadgeVariant =
  | "user"
  | "clock"
  | "shield"
  | "chat"
  | "home"
  | "refresh"
  | "hammer"
  | "map"
  | "quote";

const palette: Record<BadgeVariant, { from: string; to: string; stroke: string }> = {
  user: { from: "#0ea5e9", to: "#2563eb", stroke: "#ffffff" },
  clock: { from: "#22c55e", to: "#16a34a", stroke: "#ffffff" },
  shield: { from: "#8b5cf6", to: "#6d28d9", stroke: "#ffffff" },
  chat: { from: "#f59e0b", to: "#d97706", stroke: "#ffffff" },
  home: { from: "#14b8a6", to: "#0f766e", stroke: "#ffffff" },
  refresh: { from: "#ec4899", to: "#be185d", stroke: "#ffffff" },
  hammer: { from: "#ef4444", to: "#b91c1c", stroke: "#ffffff" },
  map: { from: "#6366f1", to: "#4338ca", stroke: "#ffffff" },
  quote: { from: "#14b8a6", to: "#0d9488", stroke: "#ffffff" },
};

export function SvgBadge({ variant, className = "size-14" }: { variant: BadgeVariant; className?: string }) {
  const c = palette[variant];
  const id = `badge-${variant}`;

  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.from} />
          <stop offset="100%" stopColor={c.to} />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="60" height="60" rx="16" fill={`url(#${id})`} />

      {variant === "user" && (
        <>
          <circle cx="36" cy="30" r="7" fill="none" stroke={c.stroke} strokeWidth="3" />
          <path d="M23 49c3-6 8-9 13-9s10 3 13 9" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {variant === "clock" && (
        <>
          <circle cx="36" cy="36" r="15" fill="none" stroke={c.stroke} strokeWidth="3" />
          <path d="M36 26v10l7 4" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {variant === "shield" && (
        <>
          <path d="M36 20 50 26v11c0 9-5 14-14 17-9-3-14-8-14-17V26z" fill="none" stroke={c.stroke} strokeWidth="3" />
          <path d="m30 37 4 4 8-8" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {variant === "chat" && (
        <>
          <path d="M21 33c0-8 7-14 15-14s15 6 15 14-7 14-15 14h-4l-7 6 2-8c-4-2-6-6-6-12Z" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="31" cy="33" r="2" fill={c.stroke} />
          <circle cx="36" cy="33" r="2" fill={c.stroke} />
          <circle cx="41" cy="33" r="2" fill={c.stroke} />
        </>
      )}
      {variant === "home" && (
        <>
          <path d="m22 34 14-12 14 12" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
          <path d="M26 32v18h20V32" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinejoin="round" />
          <path d="M33 50V40h6v10" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinejoin="round" />
        </>
      )}
      {variant === "refresh" && (
        <>
          <path d="M47 31a12 12 0 1 0 2 9" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
          <path d="m48 21 2 10-10 1" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {variant === "hammer" && (
        <>
          <path d="m25 30 9-9 8 8-9 9z" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinejoin="round" />
          <path d="M39 34 27 46" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
          <path d="m45 24 4-4" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {variant === "map" && (
        <>
          <path d="M36 52s12-11 12-20a12 12 0 1 0-24 0c0 9 12 20 12 20Z" fill="none" stroke={c.stroke} strokeWidth="3" />
          <circle cx="36" cy="32" r="4" fill="none" stroke={c.stroke} strokeWidth="3" />
        </>
      )}
      {variant === "quote" && (
        <>
          <circle cx="27" cy="28" r="7" fill="none" stroke={c.stroke} strokeWidth="3" />
          <path d="M27 35v11" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
          <circle cx="45" cy="28" r="7" fill="none" stroke={c.stroke} strokeWidth="3" />
          <path d="M45 35v11" fill="none" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
