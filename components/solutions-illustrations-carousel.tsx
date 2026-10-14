"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  EquipmentCtaDialog,
  type EquipmentCtaItem,
} from "@/components/equipment-cta-dialog";

const illustrations = [
  {
    alt: "Ilustração de ar-condicionado split azul marinho",
    src: "/Ar-condicionado-split-azul-marinho.webp",
    label: "Ar-condicionado",
  },
  {
    alt: "Ilustração de expositor vazio com interior azul claro",
    src: "/Expositor-vazio-com-interior-azul-claro.webp",
    label: "Expositores",
  },
  {
    alt: "Ilustração de freezer horizontal azul marinho",
    src: "/Freezer-horizontal-azul-marinho-estilizado.webp",
    label: "Freezers",
  },
  {
    alt: "Ilustração de frigobar azul marinho de porta única",
    src: "/Frigobar-azul-marinho-de-porta-única.webp",
    label: "Frigobar",
  },
  {
    alt: "Ilustração de geladeira azul",
    src: "/Geladeira-azul-com-fundo-transparente.webp",
    label: "Geladeiras",
  },
  {
    alt: "Ilustração de geladeira side by side azul marinho",
    src: "/Geladeira-side-by-side-azul-marinho.webp",
    label: "Side by side",
  },
];

const COUNT = illustrations.length;
const DESKTOP_VISIBLE = 4;
const LOOP_COPIES = 3;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function EquipmentCard({
  item,
  sizes,
  priority = false,
  desktop = false,
  onSelect,
}: {
  item: EquipmentCtaItem;
  sizes: string;
  priority?: boolean;
  desktop?: boolean;
  onSelect: (item: EquipmentCtaItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`flex h-full w-full cursor-pointer flex-col items-center rounded-[18px] bg-[#eef3fd] px-2 pb-3 pt-4 text-left transition-colors duration-200 hover:bg-[#e4ecfb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3077] ${desktop ? "md:px-3 md:pb-3 md:pt-5" : ""}`}
    >
      <div
        className={`relative flex h-[min(34vw,148px)] w-full items-end justify-center ${desktop ? "md:h-[140px] lg:h-[168px]" : ""}`}
      >
        <Image
          src={item.src}
          alt=""
          width={400}
          height={320}
          className="max-h-full w-auto max-w-full object-contain object-bottom"
          sizes={sizes}
          priority={priority}
        />
      </div>
      <span
        className={`mt-3 line-clamp-2 w-full text-center text-sm font-semibold leading-snug tracking-tight text-[#0A3077] ${desktop ? "md:mt-2.5 md:text-xs lg:text-sm" : ""}`}
      >
        {item.label}
      </span>
    </button>
  );
}

export function SolutionsIllustrationsCarousel() {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const jumpingRef = useRef(false);
  const jumpIdRef = useRef(0);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<EquipmentCtaItem | null>(null);
  const closeDialog = useCallback(() => setSelected(null), []);

  const setActiveLogical = (index: number) => {
    activeRef.current = index;
    setActive(index);
  };

  const loopItems = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, copy) =>
        illustrations.map((item) => ({ ...item, copy })),
      ).flat(),
    [],
  );

  const getMetrics = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return null;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    if (!slide || slide.offsetWidth === 0) return null;

    const gap = Number.parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const stride = slide.offsetWidth + gap;
    const setWidth = COUNT * stride;

    return { stride, setWidth };
  }, []);

  const jumpToMiddleSet = useCallback(
    (logicalIndex: number, behavior: ScrollBehavior = "auto") => {
      const el = scrollerRef.current;
      const metrics = getMetrics();
      if (!el || !metrics) return;

      const id = ++jumpIdRef.current;
      const target = metrics.setWidth + logicalIndex * metrics.stride;
      jumpingRef.current = true;
      el.style.scrollSnapType = "none";
      el.scrollTo({ left: target, behavior });

      const release = () => {
        if (jumpIdRef.current !== id) return;
        el.style.scrollSnapType = "";
        jumpingRef.current = false;
      };

      if (behavior === "smooth" && Math.abs(el.scrollLeft - target) > 1) {
        const done = () => {
          if (jumpIdRef.current !== id) return;
          el.removeEventListener("scrollend", done);
          release();
          normalizeInfiniteScroll();
        };
        el.addEventListener("scrollend", done);
        return;
      }

      requestAnimationFrame(release);
    },
    [getMetrics],
  );

  const normalizeInfiniteScroll = useCallback(() => {
    const el = scrollerRef.current;
    const metrics = getMetrics();
    if (!el || !metrics || jumpingRef.current) return;

    const { setWidth, stride } = metrics;
    const left = el.scrollLeft;

    if (left < setWidth * 0.5) {
      jumpingRef.current = true;
      el.style.scrollSnapType = "none";
      el.scrollLeft = left + setWidth;
      requestAnimationFrame(() => {
        el.style.scrollSnapType = "";
        jumpingRef.current = false;
      });
    } else if (left > setWidth * 1.5) {
      jumpingRef.current = true;
      el.style.scrollSnapType = "none";
      el.scrollLeft = left - setWidth;
      requestAnimationFrame(() => {
        el.style.scrollSnapType = "";
        jumpingRef.current = false;
      });
    }

    const physical = Math.round(el.scrollLeft / stride);
    setActiveLogical(mod(physical, COUNT));
  }, [getMetrics]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const align = () => jumpToMiddleSet(activeRef.current, "auto");
    align();

    const onScroll = () => {
      if (!jumpingRef.current) normalizeInfiniteScroll();
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", align);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", align);
    };
  }, [jumpToMiddleSet, normalizeInfiniteScroll]);

  const scrollBySteps = (delta: number) => {
    const el = scrollerRef.current;
    const metrics = getMetrics();
    if (!el || !metrics) return;

    const nextLogical = mod(active + delta, COUNT);
    const currentLeft = el.scrollLeft;
    const targetLeft = currentLeft + delta * metrics.stride;

    el.scrollTo({ left: targetLeft, behavior: "smooth" });
    setActiveLogical(nextLogical);

    window.setTimeout(() => normalizeInfiniteScroll(), 320);
  };

  const goToLogical = (logicalIndex: number) => {
    jumpToMiddleSet(logicalIndex, reduceMotion ? "auto" : "smooth");
    setActiveLogical(logicalIndex);
  };

  return (
    <div>
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-[#737373] md:mb-6">
        Equipamentos que atendemos
      </p>

      <ul className="grid grid-cols-2 gap-4 md:hidden">
        {illustrations.map((item) => (
          <li key={item.src}>
            <EquipmentCard
              item={item}
              sizes="46vw"
              onSelect={setSelected}
            />
          </li>
        ))}
      </ul>

      <div className="relative hidden md:block">
        <button
          type="button"
          onClick={() => scrollBySteps(-1)}
          aria-label="Ilustrações anteriores"
          className="absolute -left-1 top-[38%] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#0A3077] transition-colors duration-200 hover:bg-[#eef3fd] md:flex lg:-left-3"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollBySteps(1)}
          aria-label="Próximas ilustrações"
          className="absolute -right-1 top-[38%] z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#0A3077] transition-colors duration-200 hover:bg-[#eef3fd] md:flex lg:-right-3"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        <div
          ref={scrollerRef}
          className="scrollbar-none grid grid-flow-col auto-cols-[calc((100%-1rem)/2)] gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:auto-cols-[calc((100%-4.5rem)/4)] md:gap-6"
          aria-label="Ilustrações dos equipamentos atendidos"
        >
          {loopItems.map((item, index) => (
            <div
              key={`${item.src}-${item.copy}-${index}`}
              data-slide
              className="min-w-0 snap-start"
            >
              <EquipmentCard
                item={item}
                sizes="(max-width: 768px) 46vw, 25vw"
                priority={index >= COUNT && index < COUNT + DESKTOP_VISIBLE}
                desktop
                onSelect={setSelected}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-6 hidden items-center justify-center gap-2 md:flex"
        role="tablist"
        aria-label="Ilustrações"
      >
        {illustrations.map((item, index) => (
          <button
            key={item.src}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={item.label}
            onClick={() => goToLogical(index)}
            className="relative flex h-2 items-center justify-center"
          >
            <motion.span
              className="block h-2 rounded-full"
              animate={{
                width: active === index ? 28 : 8,
                backgroundColor: active === index ? "#0A3077" : "#cbd5e1",
              }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            />
          </button>
        ))}
      </div>

      <EquipmentCtaDialog item={selected} onClose={closeDialog} />
    </div>
  );
}
