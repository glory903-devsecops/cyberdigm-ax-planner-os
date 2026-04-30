import React from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  variant?: "default" | "glass" | "dark";
}

export function SectionCard({
  children,
  title,
  subtitle,
  icon,
  className,
  headerAction,
  variant = "default",
}: SectionCardProps) {
  const variants = {
    default: "bg-white border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)]",
    glass: "glass shadow-premium",
    dark: "bg-slate-900 border-white/5 shadow-glow-blue",
  };

  return (
    <div
      className={cn(
        "rounded-[2rem] border transition-all duration-300",
        variant === "default" ? "p-8" : "p-6",
        variants[variant],
        className
      )}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-0.5">
            <h3 className={cn(
              "font-bold text-base uppercase tracking-wider flex items-center gap-2",
              variant === "dark" ? "text-white" : "text-cmtx-navy"
            )}>
              {icon && <span className="text-cmtx-blue">{icon}</span>}
              {title}
            </h3>
            {subtitle && (
              <p className={cn(
                "text-xs font-medium",
                variant === "dark" ? "text-slate-400" : "text-cmtx-secondary"
              )}>
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
