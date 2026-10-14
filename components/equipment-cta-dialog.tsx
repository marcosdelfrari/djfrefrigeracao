"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { WhatsappLink } from "@/components/whatsapp-link";

export type EquipmentCtaItem = {
  alt: string;
  src: string;
  label: string;
};

type EquipmentCtaDialogProps = {
  item: EquipmentCtaItem | null;
  onClose: () => void;
};

export function EquipmentCtaDialog({ item, onClose }: EquipmentCtaDialogProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;

    const previous = document.activeElement;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [item, onClose]);

  if (!item) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-[#0A3077]/45"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md overflow-hidden rounded-[18px] bg-white shadow-[0_24px_60px_rgba(10,48,119,0.22)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0A3077] transition-colors duration-200 hover:bg-white"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        <div className="flex h-40 items-end justify-center bg-[#eef3fd] px-6 pt-8">
          <Image
            src={item.src}
            alt=""
            width={400}
            height={320}
            className="max-h-32 w-auto object-contain object-bottom"
          />
        </div>

        <div className="px-6 pb-6 pt-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#737373]">
            Orçamento
          </p>
          <h2
            id={titleId}
            className="mt-1 text-xl font-semibold tracking-tight text-[#0A3077]"
          >
            Manutenção de {item.label.toLowerCase()}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#525252]">
            Envie uma foto ou vídeo pelo WhatsApp e receba pré-avaliação
            gratuita em até 15 minutos. Atendimento domiciliar em Belo
            Horizonte e região.
          </p>
          <WhatsappLink
            className="mt-5 w-full rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#1ebe57]"
            message={`Olá! Preciso de manutenção em ${item.label.toLowerCase()}.`}
          >
            Chamar no WhatsApp
          </WhatsappLink>
        </div>
      </div>
    </div>,
    document.body,
  );
}
