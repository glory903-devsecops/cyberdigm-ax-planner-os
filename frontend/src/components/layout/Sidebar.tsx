"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  Gavel,
  BarChart3,
  Compass,
  Settings,
  ChevronRight,
  User,
  Cpu,
  Database,
  ShieldAlert,
  Handshake,
  TrendingUp,
  FileSearch,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const grSubItems = [
  { name: "고객사 계약 관리", href: "/gr-hub/grants", icon: FileSearch },
  { name: "유지보수 점검 현황", href: "/gr-hub/policy", icon: ShieldAlert },
  { name: "기술지원 이슈 관리", href: "/gr-hub/cooperation", icon: Handshake },
  { name: "솔루션 시장 동향", href: "/gr-hub/trends", icon: TrendingUp },
];

const coreItems = [
  { name: "고객/유지보수", href: "/gr-hub", icon: Gavel, subItems: grSubItems },
  { name: "솔루션/분석", href: "/intelligence", icon: BarChart3 },
  { name: "AX 전략/기획", href: "/ax-planning", icon: Compass },
];

const supportItems = [
  { name: "자동화 센터", href: "/automation", icon: Cpu },
  { name: "지식 정보고", href: "/knowledge", icon: Database },
];

interface SidebarProps {
  isOpen: boolean;
}

import { useAuth } from "@/lib/auth-context";
import { LogIn, LogOut, X, Key, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const isGRActive = pathname.startsWith("/gr-hub");
  const { isLoggedIn, user, logout, login } = useAuth();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  return (
    <div
      className={cn(
        "w-64 h-full bg-cmtx-navy text-white flex flex-col border-r border-white/5",
        "transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo */}
      <div className="p-6 pb-4 shrink-0">
        <div className="flex items-center gap-2 pl-2">
          <div className="w-9 h-9 bg-cmtx-blue rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-cmtx-blue/20">
            C
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Cyberdigm <span className="text-cmtx-blue-light">AX</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <nav className="space-y-6">
          {/* Core */}
          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">핵심 플랫폼</p>
            <div className="space-y-1">
              {coreItems.map((item) => {
                const isActive = item.href === "/gr-hub" ? isGRActive : pathname === item.href;
                return (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group/link text-sm font-semibold relative overflow-hidden",
                        isActive
                          ? "bg-gradient-to-r from-cmtx-blue to-cmtx-blue/80 text-white shadow-lg shadow-cmtx-blue/20"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {isActive && <div className="absolute left-0 top-0 w-1 h-full bg-white rounded-r-full" />}
                      <div className="flex items-center gap-3">
                        <item.icon className={cn("w-5 h-5 transition-transform duration-200", isActive ? "scale-110" : "group-hover/link:scale-110")} />
                        <span className="leading-tight text-xs">{item.name}</span>
                      </div>
                      {item.subItems ? (
                        <ChevronDown className={cn("w-3.5 h-3.5 opacity-50 transition-transform shrink-0", isActive ? "rotate-180" : "")} />
                      ) : (
                        pathname === item.href && <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                      )}
                    </Link>
                    {/* GR Hub sub-menu */}
                    {item.subItems && isGRActive && (
                      <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                        {item.subItems.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={cn(
                                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200 text-xs font-semibold group/sub",
                                isSubActive ? "bg-white/15 text-white" : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                              )}
                            >
                              <sub.icon className={cn("w-3.5 h-3.5 shrink-0", isSubActive ? "text-cmtx-blue-light" : "group-hover/sub:text-slate-300")} />
                              <span>{sub.name}</span>
                              {isSubActive && <div className="ml-auto w-1 h-1 rounded-full bg-cmtx-blue-light" />}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Support */}
          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">운영 지원</p>
            <div className="space-y-1.5">
              {supportItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group/link text-sm font-semibold",
                      isActive ? "bg-slate-700 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 transition-transform", isActive ? "scale-110" : "group-hover/link:scale-110")} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* External */}
          <div>
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">대외 오퍼레이션</p>
            <Link
              href="/survey/"
              target="_blank"
              className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold group/link"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                임직원 설문조사
              </div>
              <span className="text-[8px] font-black bg-white/10 text-slate-400 px-1.5 py-0.5 rounded border border-white/5 uppercase tracking-tighter">외부링크</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-6 border-t border-white/5 space-y-4 shrink-0">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group/user relative overflow-hidden">
          <div className="absolute inset-0 bg-cmtx-blue/5 opacity-0 group-hover/user:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 relative z-10">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center ring-2 transition-all duration-500",
              isLoggedIn 
                ? "bg-cmtx-blue shadow-[0_0_20px_rgba(59,130,246,0.5)] ring-cmtx-blue/50" 
                : "bg-slate-700 ring-white/5"
            )}>
              <User className={cn("w-5 h-5", isLoggedIn ? "text-white animate-pulse" : "text-slate-400")} />
            </div>
            <div className="overflow-hidden flex-1">
              <p className={cn(
                "text-sm font-bold truncate transition-colors",
                isLoggedIn ? "text-white" : "text-slate-300"
              )}>
                {isLoggedIn ? "영업대표 (사이버다임)" : "게스트 모드"}
              </p>
              <div className="flex items-center gap-1.5">
                {isLoggedIn && <div className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />}
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                  {isLoggedIn ? "Sales & Maintenance" : "Read-Only Access"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {isLoggedIn ? (
          <button 
            onClick={logout}
            className="flex items-center gap-3 text-slate-500 hover:text-rose-400 transition-colors text-xs w-full font-bold px-4"
          >
            <LogOut className="w-4 h-4" />
            시스템 로그아웃
          </button>
        ) : (
          <button 
            id="admin-login-btn"
            onClick={() => setShowLoginModal(true)}
            className="flex items-center gap-3 text-cmtx-blue-light hover:text-white transition-all group/login text-xs w-full font-bold px-4 py-2 rounded-lg hover:bg-white/5"
          >
            <LogIn className="w-4 h-4 group-hover/login:translate-x-1 transition-transform" />
            관리자 로그인
          </button>
        )}

        <button className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors text-xs w-full font-bold px-4">
          <Settings className="w-4 h-4" />
          시스템 설정
        </button>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden p-8"
            >
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cmtx-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Key className="w-8 h-8 text-cmtx-blue" />
                  </div>
                  <h3 className="text-xl font-black text-cmtx-navy tracking-tight">관리자 인증</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">시스템 제어 권한을 획득합니다.</p>
                </div>

                <LoginForm 
                  onSuccess={() => setShowLoginModal(false)} 
                  onLogin={login}
                />

                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="w-full text-center text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  나중에 하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoginForm({ onSuccess, onLogin }: { onSuccess: () => void, onLogin: (pw: string) => Promise<boolean> }) {
  const [password, setPassword] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);
    
    const success = await onLogin(password);
    if (success) {
      onSuccess();
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider pl-1">관리자 액세스 키</label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="password"
            autoFocus
            required
            className={cn(
              "w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-xs font-mono outline-none transition-all",
              isError ? "border-rose-300 ring-2 ring-rose-100" : "border-slate-200 focus:ring-2 focus:ring-cmtx-blue/20"
            )}
            placeholder="ACCESS KEY"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {isError && <p className="text-[10px] font-bold text-rose-500 pl-1">인증 키가 일치하지 않습니다.</p>}
      </div>
      <button 
        disabled={isLoading}
        className="w-full py-4 bg-cmtx-navy text-white rounded-xl text-xs font-black shadow-xl hover:bg-slate-800 disabled:opacity-50 transition-all"
      >
        {isLoading ? "인증 중..." : "인증 확인 및 접속"}
      </button>
    </form>
  );
}
