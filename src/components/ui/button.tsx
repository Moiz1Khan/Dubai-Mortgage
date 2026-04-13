import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer relative overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.2)]",
      {
        "bg-gradient-to-b from-[#323d48] via-[#28303a] to-[#222a34] text-white hover:from-[#3a4652] hover:via-[#323d48] hover:to-[#28303a] hover:shadow-[0_6px_18px_rgba(0,0,0,0.25)] active:shadow-[0_2px_8px_rgba(0,0,0,0.2)]":
          variant === "primary",
        "bg-gradient-to-b from-[#323d48] via-[#28303a] to-[#222a34] text-white hover:from-[#3a4652] hover:via-[#323d48] hover:to-[#28303a]":
          variant === "secondary",
        "border-2 border-[#28303a] bg-transparent text-[#28303a] hover:bg-[#28303a]/10 shadow-none":
          variant === "outline",
        "text-foreground hover:bg-secondary/50 shadow-none": variant === "ghost",
      },
      {
        "h-9 px-4 text-sm": size === "sm",
        "h-12 px-6 text-base": size === "md",
        "h-14 px-8 text-lg": size === "lg",
      },
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(classes, (children.props as { className?: string }).className),
      });
    }

    return (
      <button
        className={cn(classes, "transition-[color,background-color,border-color,box-shadow,opacity] duration-200")}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
