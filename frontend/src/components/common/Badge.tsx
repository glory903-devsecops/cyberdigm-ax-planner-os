import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = 
  | "default" 
  | "critical" 
  | "high" 
  | "medium" 
  | "low" 
  | "success" 
  | "secondary"
  | "warning" 
  | "outline"
  | "strategic";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const styles: Record<BadgeVariant, string> = {
    default: "bg-slate-100 text-slate-600 border-slate-200",
    critical: "bg-rose-500 text-white border-rose-600",
    high: "bg-orange-100 text-orange-700 border-orange-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-emerald-100 text-emerald-700 border-emerald-200",
    success: "bg-emerald-500 text-white border-emerald-600",
    secondary: "bg-slate-100 text-slate-400 border-slate-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    strategic: "bg-indigo-100 text-indigo-700 border-indigo-200",
    outline: "bg-transparent border-cmtx-border text-cmtx-secondary",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border transition-colors",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
