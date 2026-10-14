"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { trackWhatsappConversion } from "@/lib/google-ads";
import { whatsappUrl } from "@/lib/whatsapp";

export function FloatingWhatsapp() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting);
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="floating-whatsapp"
          className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 md:bottom-8"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
        >
          <motion.a
            href={whatsappUrl("Olá! Vim pelo site e quero falar com um técnico.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsappConversion}
            aria-label="Chamar no WhatsApp"
            className="pointer-events-auto relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1ebe57]"
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
            <span>Chamar no WhatsApp</span>
          </motion.a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
