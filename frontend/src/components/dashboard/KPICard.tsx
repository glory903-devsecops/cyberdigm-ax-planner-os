import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  color?: "blue" | "navy" | "green" | "red" | "violet";
}

export function KPICard({ title, value, icon: Icon, trend, trendType, color = "blue" }: KPICardProps) {
  const colorMap = {
    blue: "bg-blue-50 text-cmtx-blue ring-blue-500/20 shadow-blue-500/10",
    navy: "bg-slate-100 text-cmtx-navy ring-slate-500/20 shadow-slate-500/10",
    green: "bg-emerald-50 text-emerald-600 ring-emerald-500/20 shadow-emerald-500/10",
    red: "bg-rose-50 text-rose-600 ring-rose-500/20 shadow-rose-500/10",
    violet: "bg-violet-50 text-violet-600 ring-violet-500/20 shadow-violet-500/10",
  };

  const glowMap = {
    blue: "hover:shadow-blue-500/20",
    navy: "hover:shadow-slate-500/20",
    green: "hover:shadow-emerald-500/20",
    red: "hover:shadow-rose-500/20",
    violet: "hover:shadow-violet-500/20",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "p-6 bg-white border border-cmtx-border rounded-2xl shadow-premium transition-all duration-300",
        glowMap[color]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-cmtx-secondary uppercase tracking-widest">{title}</p>
          <motion.h3 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-3xl font-black text-cmtx-navy tracking-tight"
          >
            {value}
          </motion.h3>
          {trend && (
            <p className={cn(
              "text-[10px] font-bold flex items-center gap-1 mt-1",
              trendType === "positive" ? "text-emerald-600" : trendType === "negative" ? "text-rose-600" : "text-gray-500"
            )}>
              {trend}
              <span className="font-medium text-gray-400">어제 대비</span>
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl ring-1 shadow-lg transition-transform duration-500 group-hover:rotate-12", 
          colorMap[color]
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      {/* Subtle indicator line */}
      <div className="mt-4 h-1 w-full bg-gray-50 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className={cn(
            "h-full rounded-full",
            color === "red" ? "bg-rose-500" : "bg-cmtx-blue"
          )} 
        />
      </div>
    </motion.div>
  );
}

