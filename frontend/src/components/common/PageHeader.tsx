import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2.5 md:p-3 bg-cmtx-blue text-white rounded-xl md:rounded-2xl shadow-lg shadow-cmtx-blue/20 shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl md:text-3xl font-bold text-cmtx-navy tracking-tight leading-tight">{title}</h2>
            {subtitle && (
              <p className="text-xs md:text-sm text-cmtx-secondary font-medium mt-0.5 line-clamp-2">{subtitle}</p>
            )}
          </div>
        </div>
        {/* Actions */}
        {actions && (
          <div className="flex gap-2 flex-wrap items-center shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
