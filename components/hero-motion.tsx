"use client";

import Image from "next/image";
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
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`flex w-full flex-col items-start ${className}`}
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

export function HeroMobile() {
  const reduce = useReducedMotion();

  return (
    <div className="px-5 pb-10 pt-2 lg:hidden">
      <HeroCopy className="items-center">
        <HeroLine className="w-full">
          <h1 className="text-center text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white">
            Sua geladeira
            <span className="mt-1 block text-[#F6C445]">parou de gelar?</span>
            A gente resolve.
          </h1>
        </HeroLine>

        <HeroLine className="mt-6 w-full">
          <div className="relative mx-auto h-[320px] w-full max-w-[420px]">
            <div className="absolute left-1/2 top-4 h-[280px] w-[280px] -translate-x-1/2 overflow-hidden rounded-full bg-[#08255f]">
              <Image
                src="/hero.webp"
                alt="Geladeira, expositor e freezer atendidos pela DJF"
                fill
                priority
                sizes="280px"
                className="object-contain object-bottom p-2"
              />
            </div>

            <motion.div
              className="absolute left-2 top-8 rounded-2xl bg-white px-3.5 py-2 shadow-[0_8px_24px_rgba(18,35,63,0.12)]"
              animate={reduce ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 4.8, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="block text-sm font-bold leading-tight text-[#12233f]">
                Avaliação
              </span>
              <span className="block text-[11px] leading-tight text-[#8a8478]">
                no WhatsApp
              </span>
            </motion.div>
            <motion.div
              className="absolute right-0 top-[108px] rounded-2xl bg-white px-3.5 py-2 shadow-[0_8px_24px_rgba(18,35,63,0.12)]"
              animate={reduce ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 4.8, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="block text-sm font-bold leading-tight text-[#12233f]">
                6 meses
              </span>
              <span className="block text-[11px] leading-tight text-[#8a8478]">
                de garantia
              </span>
            </motion.div>

            <motion.div
              className="absolute left-4 top-[200px] rounded-2xl bg-white px-3.5 py-2 shadow-[0_8px_24px_rgba(18,35,63,0.12)]"
              animate={reduce ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 4.8, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="block text-sm font-bold leading-tight text-[#12233f]">
                Domiciliar
              </span>
              <span className="block text-[11px] leading-tight text-[#8a8478]">
               Todos os dias
              </span>
            </motion.div>

          </div>
        </HeroLine>

        <HeroLine className="w-full">
          <p className="mx-auto mt-2 max-w-[340px] text-center text-[15px] leading-relaxed text-white/80">
            Conserto de geladeira e ar-condicionado na sua casa, em Belo
            Horizonte e região.
          </p>
        </HeroLine>

        <HeroLine className="mt-6 flex w-full items-center justify-center gap-3">
          <WhatsappLink
            showIcon={false}
            className="rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1ebe57]"
            message="Olá! Quero agendar uma visita técnica."
          >
            Chamar no WhatsApp
          </WhatsappLink>
         
        </HeroLine>
      </HeroCopy>
    </div>
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
