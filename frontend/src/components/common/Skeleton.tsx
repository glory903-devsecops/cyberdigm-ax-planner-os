import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-slate-200/50 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white border border-cmtx-border rounded-2xl overflow-hidden p-6 space-y-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-2" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-12 rounded-xl" />
      </div>
      <div className="space-y-3 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="w-2 h-2 rounded-full mt-1.5" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-1/2 h-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
