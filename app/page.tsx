import {
  AirVent,
  BadgeCheck,
  Fan,
  Home as HomeIcon,
  Refrigerator,
  ShieldCheck,
  Snowflake,
  ThermometerSnowflake,
  Zap,
} from "lucide-react";
import { BrandsMarquee } from "@/components/brands-marquee";
import { SolutionsIllustrationsCarousel } from "@/components/solutions-illustrations-carousel";
import { Faq } from "@/components/faq";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { HeroCopy, HeroLine, HeroMobile, HeroVisual } from "@/components/hero-motion";
import { Navbar } from "@/components/navbar";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { Testimonials } from "@/components/testimonials";
import { WhatsappLink } from "@/components/whatsapp-link";
import { ADDRESS_LINE, MAPS_URL, PHONE_DISPLAY } from "@/lib/whatsapp";

const benefits = [
  {
    title: "Pré-avaliação em 15 min",
    description:
      "Mande foto ou vídeo no WhatsApp e receba orientação rápida antes da visita.",
    icon: Zap,
  },
  {
    title: "6 meses de garantia",
    description: "Segurança total em cada reparo — residencial ou comercial.",
    icon: ShieldCheck,
  },
  {
    title: "Segunda a domingo",
    description:
      "Atendimento domiciliar todos os dias da semana — venha até você.",
    icon: HomeIcon,
  },
  {
    title: "Técnicos certificados",
    description:
      "Diagnóstico preciso, peças de qualidade e ferramentas profissionais no local.",
    icon: BadgeCheck,
  },
];

const steps = [
  { n: "01", title: "Mande foto no WhatsApp" },
  { n: "02", title: "Pré-avaliação em 15 min" },
  { n: "03", title: "Técnico resolve no local" },
];

const solutions = [
  {
    title: "Geladeiras e Freezers",
    description: "Não gela, vaza ou faz barulho. Conserto no local, de todas as marcas.",
    icon: Refrigerator,
  },
  {
    title: "Ar-condicionado",
    description: "Não gela, goteja ou não liga. Instalação e reparo em casa ou no comércio.",
    icon: AirVent,
  },
  {
    title: "Expositores",
    description: "Balcão parou de gelar? Reparo para o comércio não ficar parado.",
    icon: ThermometerSnowflake,
  },
  {
    title: "Cervejeiras",
    description: "Esquenta, não gela ou fica barulhenta. Reparo em casa ou no ponto.",
    icon: Snowflake,
  },
  {
    title: "Frigobar",
    description: "Não gela, desliga sozinho ou faz barulho. Conserto com orçamento no local.",
    icon: Fan,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <FloatingWhatsapp />

      <main className="flex-1">
        {/* Hero */}
        <section
          id="inicio"
          className="border-b border-white/10 bg-[#0A3077] lg:border-[#e2e8f0]"
        >
          <HeroMobile />
          <div className="mx-auto hidden max-w-6xl gap-6 px-4 pb-12 pt-10 sm:gap-8 sm:pb-14 sm:pt-12 md:gap-12 md:px-10 md:py-24 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <HeroCopy>
              <HeroLine>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white">
                  <span className="relative flex h-2 w-2" aria-hidden>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
                  </span>
                  <span>Atendimento disponível hoje</span>
                </div>
              </HeroLine>
              <HeroLine>
                <h1 className="mt-4 max-w-xl text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl md:mt-2.5 md:text-5xl md:leading-[1.1]">
                  Conserto e{" "}
                  <span className="text-[#F6C445]">manutenção</span>
                </h1>
              </HeroLine>
              <HeroLine>
                <p className="mt-3 max-w-lg text-base leading-snug text-white/85 sm:text-base md:mt-4 md:text-lg md:leading-relaxed md:text-white/80">
                  <strong className="font-semibold text-white">
                    Geladeira
                  </strong>{" "}
                  e{" "}
                  <strong className="font-semibold text-white">
                    ar-condicionado
                  </strong>{" "}
                  na sua casa, em Belo Horizonte e região.
                </p>
              </HeroLine>
              <HeroLine className="mt-8 flex w-auto max-w-none flex-row items-center gap-3">
                <WhatsappLink
                  className="w-full justify-center rounded-full bg-[#25D366] px-6 py-4 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-colors duration-200 hover:bg-[#1ebe57] md:w-auto md:py-3.5 md:text-sm"
                  message="Olá! Quero agendar uma visita técnica."
                >
                  Chamar no WhatsApp
                </WhatsappLink>
                <a
                  href="#como-funciona"
                  className="hidden items-center justify-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 sm:inline-flex md:inline-flex md:w-auto"
                >
                  Como funciona
                </a>
              </HeroLine>
              <HeroLine>
                <p className="mt-2.5 flex items-center gap-2 text-xs text-white/70">
                  <Zap className="h-3.5 w-3.5 shrink-0 text-[#25D366]" aria-hidden />
                  <span>Pré-avaliação rápida no WhatsApp em até 15 min</span>
                </p>
              </HeroLine>
            </HeroCopy>

            <HeroVisual />
          </div>
        </section>

        {/* Marcas / social proof */}
        <section className="border-b border-[#e2e8f0] bg-white py-10 md:py-12">
          <div className="mx-auto max-w-6xl px-4 md:px-10">
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-wider text-[#737373]">
              Trabalhamos com as principais marcas
            </p>
            <BrandsMarquee />
          </div>
        </section>

        {/* Equipamentos */}
        <section
          id="equipamentos"
          className="scroll-mt-24 border-b border-[#e2e8f0] bg-white py-10 md:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 md:px-10">
            <SolutionsIllustrationsCarousel />
          </div>
        </section>

        {/* Vantagens */}
        <section id="vantagens" className="scroll-mt-24 py-10 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-10">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#525252]">
                Por que a DJF
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0A3077] md:text-4xl">
                Por que nos chamar
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#525252] md:mt-3 md:text-base">
                Visita no local, transparência no orçamento e 6 meses de
                garantia.
              </p>
            </Reveal>

            <Stagger className="mt-6 grid grid-cols-2 gap-3 md:mt-10 md:gap-4">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.title}>
                    <article className="flex h-full items-start gap-2.5 rounded-[18px] border border-[#e2e8f0] bg-white px-3 py-3.5 md:block md:p-8 md:transition-colors md:duration-200 md:hover:bg-[#eef3fd]">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(10,48,119,0.12)] text-[#0A3077] md:h-11 md:w-11">
                        <Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold leading-snug tracking-tight text-[#171717] md:mt-5 md:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 hidden text-base leading-relaxed text-[#525252] md:block">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* Soluções */}
        <section
          id="solucoes"
          className="scroll-mt-24 border-y border-[#e2e8f0] bg-white py-10 md:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 md:px-10">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#525252]">
                Soluções
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0A3077] md:text-4xl">
                O que consertamos
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#525252] md:mt-3 md:text-base">
                Geladeira de todas as marcas, ar-condicionado e outros
                equipamentos — com atendimento domiciliar de segunda a domingo.
              </p>
            </Reveal>

            <Stagger className="mt-6 divide-y divide-[#e2e8f0] overflow-hidden rounded-[18px] border border-[#e2e8f0] bg-[#f7f9fc] md:mt-10 md:grid md:grid-cols-2 md:gap-4 md:divide-y-0 md:border-0 md:bg-transparent">
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <StaggerItem key={solution.title}>
                    <article className="flex items-start gap-3 px-4 py-3.5 md:flex-col md:rounded-[18px] md:border md:border-[#e2e8f0] md:bg-[#f7f9fc] md:p-8 md:transition-colors md:duration-200 md:hover:bg-[#eef3fd]">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(10,48,119,0.12)] text-[#0A3077] md:h-11 md:w-11">
                        <Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold tracking-tight text-[#171717] md:mt-5 md:text-2xl">
                          {solution.title}
                        </h3>
                        <p className="mt-0.5 text-xs leading-snug text-[#525252] md:mt-2 md:text-sm">
                          {solution.description}
                        </p>
                      </div>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="scroll-mt-24 px-4 py-10 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[18px] bg-[#0A3077] px-6 py-10 text-center md:px-12 md:py-16">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Como funciona
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-4xl">
                Sem formulário. Chame no WhatsApp.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                Mande uma foto do problema e receba a pré-avaliação em até 15
                minutos. O técnico vai até você.
              </p>
            </Reveal>

            <ol className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 text-left sm:flex-row sm:justify-center sm:gap-8 sm:text-center">
              {steps.map((step) => (
                <li key={step.n} className="text-sm text-white/90">
                  <span className="mr-2 font-semibold text-[#F6C445]">{step.n}</span>
                  {step.title}
                </li>
              ))}
            </ol>

            <Reveal className="mt-8 flex justify-center">
              <WhatsappLink
                className="rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#1ebe57]"
                message="Olá! Quero um orçamento — vou enviar foto do problema."
              >
                Chamar no WhatsApp
              </WhatsappLink>
            </Reveal>
          </div>
        </section>

        {/* Depoimentos */}
        <section
          id="depoimentos"
          className="scroll-mt-24 border-y border-[#e2e8f0] bg-white py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 md:px-10">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#525252]">
                Depoimentos
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0A3077] md:text-4xl">
                Clientes
              </h2>
              <p className="mt-3 hidden max-w-2xl text-base leading-relaxed text-[#525252] md:block">
                Avaliação 5,0 no Google — confiança que aparece no resultado.
              </p>
            </Reveal>

            <Reveal className="mt-8 md:mt-10" delay={0.08}>
              <Testimonials />
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-10">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#525252]">
              FAQ
            </p>
            <h2 className="mt-2 text-center text-2xl font-semibold tracking-tight text-[#0A3077] md:text-4xl">
              Dúvidas
            </h2>
            <p className="mx-auto mt-3 hidden max-w-2xl text-center text-base leading-relaxed text-[#525252] md:block">
              Ainda com dúvida? Chame no WhatsApp — respondemos na hora.
            </p>
            <div className="mt-10">
              <Faq />
            </div>
          </div>
        </section>

        {/* CTA final — desktop */}
        <section className="hidden px-4 pb-16 md:block md:px-10 md:pb-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[18px] bg-[#0A3077] px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">
              Precisa de orçamento?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
              Envie uma foto ou vídeo do problema pelo WhatsApp e receba
              pré-avaliação gratuita em até 15 minutos.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <WhatsappLink
                className="rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#1ebe57]"
                message="Olá! Quero um orçamento — vou enviar foto do problema."
              >
                Chamar no WhatsApp
              </WhatsappLink>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/35 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Ver no Google Maps
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0A3077] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3 md:px-10 md:py-12">
          <div>
            <p className="text-base font-semibold tracking-tight">
              DJF Refrigeração
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Assistência técnica em refrigeração — visita no local.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
              Funcionamento
            </p>
            <p className="mt-2 text-sm font-medium">Segunda a domingo</p>
            <p className="mt-1 text-sm text-white/75">
              Atendimento domiciliar em BH e região
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
              Endereço
            </p>
            <p className="mt-2 text-sm font-medium">{ADDRESS_LINE}</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-white/75 underline underline-offset-2 transition-colors duration-200 hover:text-white"
            >
              Ver no Google Maps
            </a>
            <p className="mt-3 text-sm text-white/75">
              WhatsApp{" "}
              <WhatsappLink
                className="font-medium text-white hover:text-white/90"
                message="Olá! Quero falar com a DJF Refrigeração."
                showIcon={false}
              >
                {PHONE_DISPLAY}
              </WhatsappLink>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-4 pb-24 text-xs text-white/55 md:px-10 md:pb-24">
            <p>© 2026 DJF Refrigeração. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
