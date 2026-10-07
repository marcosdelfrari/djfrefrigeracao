"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  AirVent,
  Home as HomeIcon,
  Refrigerator,
  Snowflake,
  Wrench,
} from "lucide-react";
import { WhatsappLink } from "@/components/whatsapp-link";

const ease = [0.22, 1, 0.36, 1] as const;

const flakes = [
  { top: "8%", left: "12%", size: 14, delay: 0, duration: 7 },
  { top: "22%", left: "78%", size: 18, delay: 1.2, duration: 8.5 },
  { top: "58%", left: "8%", size: 12, delay: 0.6, duration: 6.5 },
  { top: "72%", left: "86%", size: 16, delay: 2, duration: 9 },
  { top: "40%", left: "92%", size: 11, delay: 1.5, duration: 7.5 },
];

export function HeroCopy({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-start"
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.1, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative hidden min-h-[320px] lg:block"
      initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.25 }}
    >
      {!reduce
        ? flakes.map((flake, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute text-white/25"
              style={{
                top: flake.top,
                left: flake.left,
                width: flake.size,
                height: flake.size,
              }}
              animate={{
                y: [0, -14, 0],
                opacity: [0.2, 0.45, 0.2],
                rotate: [0, 20, 0],
              }}
              transition={{
                duration: flake.duration,
                delay: flake.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Snowflake className="h-full w-full" aria-hidden />
            </motion.span>
          ))
        : null}

      <div className="absolute inset-0 rounded-[18px] border border-white/20 bg-white/10" />
      <div className="absolute inset-6 flex flex-col justify-between rounded-[18px] border border-white/15 bg-[#08255f] p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <Wrench className="h-5 w-5 text-white" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">
              Atendimento domiciliar
            </p>
            <p className="text-xs text-white/70">Segunda a domingo</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-white/90">
            <Refrigerator className="h-4 w-4 text-white" aria-hidden />
            Geladeira de todas as marcas
          </div>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <AirVent className="h-4 w-4 text-white" aria-hidden />
            Ar-condicionado
          </div>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <HomeIcon className="h-4 w-4 text-white" aria-hidden />
            Visita técnica de segunda a domingo
          </div>
        </div>
        <WhatsappLink
          className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0A3077] hover:bg-[#eef3fd]"
          message="Olá! Vim pelo site e quero um orçamento."
        >
          Orçamento no WhatsApp
        </WhatsappLink>
      </div>
    </motion.div>
  );
}
