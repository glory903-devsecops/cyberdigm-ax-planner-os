"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  Smartphone, 
  UserCircle2, 
  ShieldCheck,
  ClipboardCheck,
  Hash
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STEPS = {
  INTRO: 0,
  AUTH: 1,
  QUESTION_1: 2,
  QUESTION_2: 3,
  SUCCESS: 4,
};

export default function MobileSurveyPage() {
  const [step, setStep] = useState(STEPS.INTRO);
  const [employeeId, setEmployeeId] = useState("");
  const [results, setResults] = useState({
    frictionArea: "",
    idea: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden bg-white">
      {/* Progress Bar (Mobile Style) */}
      <div className="h-1.5 w-full bg-slate-100 flex sticky top-0 z-50">
        <div 
          className="h-full bg-cmtx-blue transition-all duration-500 ease-out" 
          style={{ width: `${(step / STEPS.SUCCESS) * 100}%` }}
        />
      </div>

      <main className="flex-1 flex flex-col px-6 py-8">
        <AnimatePresence mode="wait">
          {/* STEP 0: INTRO */}
          {step === STEPS.INTRO && (
            <motion.div 
              key="intro"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="w-20 h-20 bg-cmtx-blue/10 rounded-3xl flex items-center justify-center">
                <Smartphone className="w-10 h-10 text-cmtx-blue" />
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl font-bold text-cmtx-navy">임직원 AX 혁신 설문</h1>
                <p className="text-slate-500 text-sm leading-relaxed px-4">
                  CMTX의 디지털 혁신(AX)을 위해 현장의 목소리를 들려주세요. <br/>
                  모바일에서 1분이면 충분합니다.
                </p>
              </div>
              <button 
                onClick={nextStep}
                className="w-full bg-cmtx-blue text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-cmtx-blue/20"
              >
                설문 시작하기
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* STEP 1: AUTH */}
          {step === STEPS.AUTH && (
            <motion.div 
              key="auth"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-cmtx-navy">본인 인증</h2>
                <p className="text-sm text-slate-500">정확한 분석을 위해 사번을 입력해 주세요.</p>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="사번 7자리 입력"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:border-cmtx-blue outline-none transition-all font-mono tracking-widest text-lg"
                  />
                </div>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-[11px] text-amber-800 leading-tight">
                    입력하신 사번은 데이터 중복 방지 및 익명화 처리를 위해서만 사용되며, 개인을 특정하여 공개되지 않습니다.
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-8 flex gap-3">
                <button onClick={prevStep} className="p-4 rounded-2xl bg-slate-100 text-slate-600"><ArrowLeft/></button>
                <button 
                  disabled={employeeId.length < 5}
                  onClick={nextStep}
                  className="flex-1 bg-cmtx-blue text-white py-4 rounded-2xl font-bold disabled:opacity-50"
                >
                  인증 완료
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: QUESTION 1 */}
          {step === STEPS.QUESTION_1 && (
            <motion.div 
              key="q1"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[10px] bg-cmtx-blue/10 text-cmtx-blue px-2 py-0.5 rounded font-bold uppercase">Topic 01</span>
                <h2 className="text-xl font-bold text-cmtx-navy leading-snug">
                  현재 우리 부서에서 가장 디지털화가 시급한 업무 영역은 어디인가요?
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "단순 반복적인 문서/데이터 입력",
                  "부서 간 복잡한 협업/승인 절차",
                  "사내 보안 정책으로 인한 접근 제한",
                  "기존 레거시 시스템의 사용 불편",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setResults({...results, frictionArea: option});
                      nextStep();
                    }}
                    className={cn(
                      "text-left p-5 rounded-2xl border-2 transition-all active:scale-[0.98]",
                      results.frictionArea === option 
                        ? "border-cmtx-blue bg-cmtx-blue/5 text-cmtx-blue" 
                        : "border-slate-50 bg-slate-50 text-slate-600 hover:border-slate-200"
                    )}
                  >
                    <span className="font-medium text-sm">{option}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: QUESTION 2 */}
          {step === STEPS.QUESTION_2 && (
            <motion.div 
              key="q2"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[10px] bg-cmtx-blue/10 text-cmtx-blue px-2 py-0.5 rounded font-bold uppercase">Topic 02</span>
                <h2 className="text-xl font-bold text-cmtx-navy leading-snug">
                  AI를 도입한다면 어떤 부분에서 가장 큰 도움을 받고 싶으신가요?
                </h2>
              </div>
              <textarea 
                placeholder="자유롭게 의견을 적어주세요 (예: 주간 보고서 자동 초안 작성...)"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 min-h-[160px] focus:border-cmtx-blue outline-none text-sm leading-relaxed"
                value={results.idea}
                onChange={(e) => setResults({...results, idea: e.target.value})}
              />
              <div className="flex gap-3">
                <button onClick={prevStep} className="p-4 rounded-2xl bg-slate-100 text-slate-600"><ArrowLeft/></button>
                <button 
                  onClick={nextStep}
                  className="flex-1 bg-cmtx-navy text-white py-4 rounded-2xl font-bold"
                >
                  설문 제출하기
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === STEPS.SUCCESS && (
            <motion.div 
              key="success"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-cmtx-navy">제출 완료</h1>
                <p className="text-slate-500 text-sm leading-relaxed px-6">
                  소중한 의견 감사드립니다. <br/>
                  여러분의 답변은 CMTX의 AX 미래 전략 기획의 핵심 근거로 활용됩니다.
                </p>
              </div>
              <div className="pt-8 w-full">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-500 text-center">
                  브라우저를 종료하셔도 좋습니다.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Footer */}
      <footer className="px-6 py-6 border-t border-slate-50 text-center">
        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
          Powered by CMTX AX-Planner OS
        </p>
      </footer>
    </div>
  );
}
