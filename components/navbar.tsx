"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  { href: "#vantagens", label: "Vantagens" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-[#e2e8f0] bg-white"
          : "border-b border-transparent bg-[#0A3550]"
      }`}
    >
      <div className="mx-auto flex h-[80px] max-w-6xl items-center justify-between px-4 md:px-10">
        <a
          href="#inicio"
          className={`flex items-center transition-colors duration-200 `}
          aria-label="DJF Refrigeração"
        >
          <Logo
            priority
            className={`w-auto transition-[height] duration-200 ${
              scrolled ? "h-12 sm:h-14" : "h-12 sm:h-14"
            }`}
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                scrolled
                  ? "text-[#525252] hover:text-[#0A3550]"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 lg:hidden ${
            scrolled
              ? "border-[#e2e8f0] text-[#0A3550] hover:bg-[#f3f3f3]"
              : "border-white/25 text-white hover:bg-white/10"
          }`}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div
          className={`border-t px-4 py-4 transition-colors duration-200 lg:hidden ${
            scrolled
              ? "border-[#e2e8f0] bg-white"
              : "border-white/10 bg-[#0A3550]"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-[12px] px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-[#525252] hover:bg-[#f3f3f3] hover:text-[#0A3550]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
