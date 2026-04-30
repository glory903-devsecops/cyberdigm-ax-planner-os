"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string; role: string } | null;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  // 로컬 스토리지에서 세션 유지 확인
  useEffect(() => {
    const savedSession = localStorage.getItem("cmtx_admin_session");
    if (savedSession === "active") {
      setIsLoggedIn(true);
      setUser({ email: "admin@cmtx.ai", role: "Enterprise Admin" });
    }
  }, []);

  const login = async (password: string) => {
    // 실제 운영시에는 Supabase Auth를 사용하지만, 
    // 요청하신 대로 로컬 패스워드 방식을 인증 시스템으로 통합합니다.
    const adminKey = process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY || "cmtx-admin-2024";
    
    if (password === adminKey) {
      setIsLoggedIn(true);
      setUser({ email: "admin@cmtx.ai", role: "Enterprise Admin" });
      localStorage.setItem("cmtx_admin_session", "active");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("cmtx_admin_session");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
