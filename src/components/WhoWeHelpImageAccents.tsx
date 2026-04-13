/**
 * Decorative SVGs for the Who We Help sticky image — UAE mortgage / EIBOR / home finance theme.
 */

import { cn } from "@/lib/utils";

export function WhoWeHelpTopLeftAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 88"
      className={cn("text-[#0b192e] dark:text-slate-200", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 58 L26 46 L40 50 L54 34 L72 28"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.92}
      />
      <circle cx="72" cy="28" r="5" fill="currentColor" opacity={0.12} stroke="currentColor" strokeWidth="1.75" />
      <path d="M10 62h68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={0.32} />
      <path d="M22 62v4 M44 62v4 M66 62v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={0.28} />
      <rect x="16" y="48" width="6" height="14" rx="1.5" fill="currentColor" opacity={0.2} />
      <rect x="50" y="40" width="6" height="22" rx="1.5" fill="currentColor" opacity={0.3} />
    </svg>
  );
}

export function WhoWeHelpBottomRightAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 88"
      className={cn("text-[#0b192e] dark:text-slate-100", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M18 48 L44 26 L70 48 V66 H18Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        opacity={0.9}
      />
      <path
        d="M36 66 V50 h16v16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        opacity={0.9}
      />
      <path
        d="M62 38c0-6 8-6 8 0v8c0 5-4 9-8 11-4-2-8-6-8-11v-8Z"
        fill="currentColor"
        opacity={0.1}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M66 42v6 M63 45h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity={0.48} />
      <circle cx="28" cy="36" r="9" stroke="currentColor" strokeWidth="1.5" opacity={0.38} />
      <path d="M24 36h8 M28 32v8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity={0.38} />
    </svg>
  );
}
