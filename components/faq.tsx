"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Quanto tempo demora o orçamento?",
    a: "Envie uma foto ou vídeo pelo WhatsApp e receba uma pré-avaliação gratuita em até 15 minutos. O orçamento final é confirmado no local após o diagnóstico.",
  },
  {
    q: "Vocês dão garantia no serviço?",
    a: "Sim. Todos os serviços da DJF Refrigeração têm 6 meses de garantia, para você ter tranquilidade após o reparo.",
  },
  {
    q: "Qual a área de atendimento?",
    a: "Atendemos Belo Horizonte e toda a região metropolitana de MG, com visita técnica em domicílio ou no seu comércio.",
  },
  {
    q: "Atendem finais de semana?",
    a: "Sim. Atendimento domiciliar de segunda a domingo. Chame no WhatsApp para agendar a visita.",
  },
  {
    q: "Quais equipamentos vocês consertam?",
    a: "Manutenção de geladeira de todas as marcas, ar-condicionado, freezers, expositores, cervejeiras e frigobares — residenciais e comerciais.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {faqs.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-[18px] border border-[#e2e8f0] bg-white"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-[#f7f9fc]"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
            >
              <span className="text-base font-semibold tracking-tight text-[#171717]">
                {item.q}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-[#0A3077] transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            {open ? (
              <p className="border-t border-[#ededed] px-5 py-4 text-base leading-relaxed text-[#525252]">
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
