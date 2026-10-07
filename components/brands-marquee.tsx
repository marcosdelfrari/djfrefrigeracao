"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const brands = [
  { name: "Elgin", src: "/elgin.svg" },
  { name: "Fujitsu", src: "/fujitsu.webp" },
  { name: "Gree", src: "/gree.webp" },
  { name: "LG", src: "/lg.webp" },
  { name: "Carrier", src: "/carrier.webp" },
  { name: "Samsung", src: "/samsumg.webp" },
];

function BrandRow() {
  return (
    <>
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="flex h-8 w-[88px] shrink-0 items-center justify-center"
        >
          <Image
            src={brand.src}
            alt={brand.name}
            width={88}
            height={32}
            className="h-full w-full object-contain opacity-70 grayscale"
          />
        </div>
      ))}
    </>
  );
}

export function BrandsMarquee() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8">
        <BrandRow />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent md:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent md:w-16" />
      <motion.div
        className="flex w-max items-center gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        <div className="flex items-center gap-10">
          <BrandRow />
        </div>
        <div className="flex items-center gap-10" aria-hidden>
          <BrandRow />
        </div>
      </motion.div>
    </div>
  );
}
