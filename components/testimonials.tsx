"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Silvana Costa",
    text: "Atendimento excelente e super prático! O técnico veio até a minha casa, resolveu o problema da minha geladeira no mesmo dia e ainda me deu 6 meses de garantia.",
  },
  {
    name: "Hellena Alves",
    text: "Muito satisfeito com o serviço na minha cervejeira. Chegaram no horário combinado, foram extremamente educados e o equipamento voltou a funcionar perfeitamente.",
  },
  {
    name: "José Silva",
    text: "Profissionais capacitados e transparentes no orçamento. Consertaram o expositor do meu comércio rapidamente e sem dor de cabeça.",
  },
];

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const slide = el.querySelector<HTMLElement>("[data-slide]");
      if (!slide) return;
      const gap = 12;
      const index = Math.round(el.scrollLeft / (slide.offsetWidth + gap));
      setActive(Math.max(0, Math.min(index, testimonials.length - 1)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    if (!slide) return;
    el.scrollTo({
      left: index * (slide.offsetWidth + 12),
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0"
      >
        {testimonials.map((item) => (
          <article
            key={item.name}
            data-slide
            className="w-[85%] shrink-0 snap-center rounded-[18px] border border-[#e2e8f0] bg-[#f7f9fc] p-5 md:w-auto md:snap-align-none md:p-6"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#1B6CA8] text-[#1B6CA8]"
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#525252] md:text-base">
              &ldquo;{item.text}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3 md:mt-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A3550] text-sm font-semibold text-white">
                {item.name.charAt(0)}
              </span>
              <p className="text-sm font-semibold text-[#171717]">{item.name}</p>
            </div>
          </article>
        ))}
      </div>

      <div
        className="mt-4 flex items-center justify-center gap-2 md:hidden"
        role="tablist"
        aria-label="Depoimentos"
      >
        {testimonials.map((item, index) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={`Depoimento ${index + 1}`}
            onClick={() => goTo(index)}
            className="relative flex h-2 items-center justify-center"
          >
            <motion.span
              className="block h-2 rounded-full bg-[#1B6CA8]"
              animate={{
                width: active === index ? 24 : 8,
                backgroundColor: active === index ? "#1B6CA8" : "#cbd5e1",
              }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
