"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import React, { useState, useEffect } from "react";
import { Menu, X, Database, Cpu, Plus, Gavel, BarChart3, Compass, FileSearch, ShieldAlert, Handshake, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-slate-50/50">

      {/* ── Desktop/Tablet Sidebar (hover reveal) ─────────────────── */}
      <div
        className="hidden sm:flex fixed left-0 top-0 h-screen z-50 group/sidebar-container"
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        {/* 더 넓은 호버 감지 영역 (사용자 편의성 향상) */}
        <div className={cn(
          "absolute left-0 top-0 w-6 h-full transition-all duration-300 z-10",
          isSidebarOpen ? "w-0" : "w-6 bg-gradient-to-r from-cmtx-blue/20 to-transparent cursor-pointer"
        )} />
        
        {/* 항상 보이는 얇은 인디케이터 스트립 */}
        <div className={cn(
          "absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-cmtx-blue via-cmtx-navy to-slate-900 opacity-70 transition-opacity duration-300",
          isSidebarOpen ? "opacity-0" : "opacity-70"
        )} />
        
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* Mobile Top Header (Visible only on < 640px) */}
      <header className="sm:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-cmtx-border z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cmtx-blue rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-cmtx-blue/20">
            C
          </div>
          <span className="font-bold text-lg tracking-tight text-cmtx-navy">
             CMTX <span className="text-cmtx-blue">AX</span>
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Overlay Menu (Visible only on < 640px) */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-40 bg-white pt-20 px-6 overflow-y-auto pb-8">
          {/* ... (모바일 메뉴 동일) */}
          <nav className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-3">핵심 플랫폼</p>
            {[
              { name: "대관/정부지원", href: "/gr-hub", icon: Gavel },
              { name: "└ 지원사업 확보", href: "/gr-hub/grants", icon: FileSearch, sub: true },
              { name: "└ 정책/규제 대응", href: "/gr-hub/policy", icon: ShieldAlert, sub: true },
              { name: "└ 정부/기관 협력", href: "/gr-hub/cooperation", icon: Handshake, sub: true },
              { name: "└ 산업 동향 대응", href: "/gr-hub/trends", icon: TrendingUp, sub: true },
              { name: "산업/분석", href: "/intelligence", icon: BarChart3 },
              { name: "AX/기획", href: "/ax-planning", icon: Compass },
            ].map((item: any) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 p-3.5 rounded-2xl font-bold transition-all text-sm",
                  item.sub ? "ml-4 py-2.5" : "",
                  pathname === item.href
                    ? "bg-cmtx-blue text-white"
                    : item.sub
                      ? "bg-slate-50 text-slate-500"
                      : "bg-slate-100 text-slate-700"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-3">운영 지원</p>
              {[
                { name: "자동화 센터", href: "/automation", icon: Cpu },
                { name: "지식 정보고", href: "/knowledge", icon: Database },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 p-3.5 rounded-2xl font-bold transition-all text-sm mb-2",
                    pathname === item.href ? "bg-cmtx-blue text-white" : "bg-slate-100 text-slate-700"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* ── Main Content Area (push right when sidebar opens) */}
      <main
        className={cn(
          "flex-1 min-h-screen transition-all duration-300",
          "pt-16 sm:pt-0",
          isSidebarOpen ? "sm:ml-64" : "sm:ml-0"
        )}
      >
        <div className="p-6 sm:p-10 max-w-7xl mx-auto">
          {children}
        </div>

        {/* Mobile Quick Insight FAB */}
        <button className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-cmtx-blue text-white rounded-full shadow-2xl shadow-cmtx-blue/40 flex items-center justify-center z-50 active:scale-90 transition-transform">
          <Plus className="w-8 h-8" />
        </button>
      </main>
    </div>
  );
}
