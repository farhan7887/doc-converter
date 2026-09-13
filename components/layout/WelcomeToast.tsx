"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

export default function WelcomeToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 800);
    const hideTimer = setTimeout(() => setShow(false), 7000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 flex items-start gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">
              Welcome to DocConverter! 👋
            </p>
            <p className="text-sm text-slate-500 mt-0.5">
              Built by Farri — hope this makes your file conversions easier.
            </p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-slate-400 hover:text-slate-600 transition flex-shrink-0"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}