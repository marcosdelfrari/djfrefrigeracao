"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/faq-data";

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
