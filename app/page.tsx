import {
  AirVent,
  BadgeCheck,
  Fan,
  Home as HomeIcon,
  Refrigerator,
  ShieldCheck,
  Snowflake,
  ThermometerSnowflake,
  Wrench,
  Zap,
} from "lucide-react";
import { BrandsMarquee } from "@/components/brands-marquee";
import { Faq } from "@/components/faq";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { HeroCopy, HeroLine, HeroVisual } from "@/components/hero-motion";
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
  {
    n: "01",
    title: "Chame no WhatsApp",
    description:
      "Descreva o problema e, se puder, envie uma foto ou vídeo do equipamento.",
  },
  {
    n: "02",
    title: "Receba a pré-avaliação",
    description:
      "Em até 15 minutos alinhamos urgência, valor estimado e horário da visita.",
  },
  {
    n: "03",
    title: "Resolvemos no local",
    description:
      "O técnico vai até você, conserta com transparência e deixa 6 meses de garantia.",
  },
];

const solutions = [
  {
    title: "Geladeiras e Freezers",
    description:
      "Manutenção de geladeira de todas as marcas. Diagnóstico e reparo no local, com peças de qualidade e atendimento ágil em BH e região.",
    icon: Refrigerator,
  },
  {
    title: "Ar-condicionado",
    description:
      "Instalação, manutenção e reparo de ar-condicionado. Atendimento domiciliar para manter o conforto da sua casa ou comércio.",
    icon: AirVent,
  },
  {
    title: "Expositores",
    description:
      "Manutenção preventiva e corretiva em balcões e expositores comerciais. Prioridade técnica para o seu negócio não parar.",
    icon: ThermometerSnowflake,
  },
  {
    title: "Cervejeiras",
    description:
      "Assistência especializada quando a cervejeira para de gelar ou esquenta. Diagnóstico preciso em residência ou estabelecimento.",
    icon: Snowflake,
  },
  {
    title: "Frigobar",
    description:
      "Barulho, falha de refrigeração ou pane — manutenção completa com orçamento transparente e suporte técnico qualificado.",
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
          className="border-b border-[#e2e8f0] bg-[#0A3550]"
        >
          <div className="mx-auto grid max-w-6xl gap-6 px-4 pt-7 pb-10 sm:gap-8 sm:py-14 md:gap-12 md:px-10 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <HeroCopy>
              <HeroLine>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90">
                  <span className="h-2 w-2 rounded-full bg-[#25D366]" aria-hidden />
                  <span>Atendimento Disponível</span>
                </div>
              </HeroLine>
              <HeroLine>
                <h1 className="mt-2.5 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.1]">
                  Conserto e Manutenção
                </h1>
              </HeroLine>
              <HeroLine>
                <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base md:mt-4 md:text-lg">
                  Trabalhamos com todas as marcas, direto na sua casa.
                 
                </p>
              </HeroLine>
              <HeroLine className="mt-4.5 flex w-full flex-col gap-3 md:mt-8 md:w-auto md:flex-row md:items-center">
                <WhatsappLink
                  className="w-full justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1ebe57] md:w-auto"
                  message="Olá! Quero agendar uma visita técnica."
                >
                  Chamar no WhatsApp
                </WhatsappLink>
                <a
                  href="#como-funciona"
                  className="hidden items-center justify-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 md:inline-flex"
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

              {/* Card visual exclusivo para mobile/tablet (sem sombra e sem degradê) */}
              <HeroLine className="mt-4.5 w-full lg:hidden">
                <div className="rounded-[18px] border border-white/15 bg-[#083049] p-3.5 text-white sm:p-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                        <Wrench className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <div>
                        <p className="text-xs font-semibold leading-tight text-white">
                          Atendimento domiciliar
                        </p>
                        <p className="text-[11px] leading-tight text-white/65">
                          Técnico vai até a sua casa
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#25D366]/15 px-2.5 py-1 text-[11px] font-semibold text-[#25D366]">
                      Hoje disponível
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2.5 sm:pt-3">
                    <div className="flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/5 px-2.5 py-2 text-xs text-white/90">
                      <Refrigerator className="h-3.5 w-3.5 shrink-0 text-[#25D366]" aria-hidden />
                      <span className="truncate">Todas as marcas</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/5 px-2.5 py-2 text-xs text-white/90">
                      <AirVent className="h-3.5 w-3.5 shrink-0 text-[#25D366]" aria-hidden />
                      <span className="truncate">Ar-condicionado</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/5 px-2.5 py-2 text-xs text-white/90">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#25D366]" aria-hidden />
                      <span className="truncate">6 meses garantia</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/5 px-2.5 py-2 text-xs text-white/90">
                      <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[#25D366]" aria-hidden />
                      <span className="truncate">Técnicos certificados</span>
                    </div>
                  </div>
                </div>
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

        {/* Vantagens */}
        <section id="vantagens" className="scroll-mt-24 py-10 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-10">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#525252]">
                Por que a DJF
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0A3550] md:text-4xl">
                Por que nos chamar
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#525252] md:mt-3 md:text-base">
                Visita no local, transparência no orçamento e 6 meses de
                garantia.
              </p>
            </Reveal>

            <Stagger className="mt-6 divide-y divide-[#e2e8f0] overflow-hidden rounded-[18px] border border-[#e2e8f0] bg-white md:mt-10 md:grid md:grid-cols-2 md:gap-4 md:divide-y-0 md:border-0 md:bg-transparent">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={item.title}>
                    <article className="flex items-start gap-3 px-4 py-3.5 md:block md:rounded-[18px] md:border md:border-[#e2e8f0] md:bg-white md:p-8 md:transition-colors md:duration-200 md:hover:bg-[#f3f8fc]">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(27,108,168,0.12)] text-[#1B6CA8] md:h-11 md:w-11">
                        <Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight text-[#171717] md:mt-5 md:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-sm leading-snug text-[#525252] md:mt-2 md:text-base md:leading-relaxed">
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
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0A3550] md:text-4xl">
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
                    <article className="flex items-start gap-3 px-4 py-3.5 md:flex-col md:rounded-[18px] md:border md:border-[#e2e8f0] md:bg-[#f7f9fc] md:p-8 md:transition-colors md:duration-200 md:hover:bg-[#f0f7fc]">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(27,108,168,0.12)] text-[#1B6CA8] md:h-11 md:w-11">
                        <Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight text-[#171717] md:mt-5 md:text-xl">
                          {solution.title}
                        </h3>
                        <p className="mt-0.5 text-sm leading-snug text-[#525252] md:mt-2 md:text-base md:leading-relaxed">
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
        <section id="como-funciona" className="scroll-mt-24 py-10 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-10">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#525252]">
                Como funciona
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0A3550] md:text-4xl">
                Como funciona
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#525252] md:mt-3 md:text-base">
                Sem formulário. O caminho mais rápido é o WhatsApp.
              </p>
            </Reveal>

            <Stagger className="mt-6 md:mt-10 md:grid md:grid-cols-3 md:gap-4">
              {steps.map((step) => (
                <StaggerItem key={step.n}>
                  <div className="flex gap-3 border-b border-[#e2e8f0] py-3.5 last:border-b-0 md:block md:rounded-[18px] md:border md:border-[#e2e8f0] md:bg-[#f7f9fc] md:p-8 md:last:border">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(27,108,168,0.12)] text-xs font-semibold text-[#1B6CA8] md:mb-0 md:h-auto md:w-auto md:justify-start md:rounded-none md:bg-transparent md:uppercase md:tracking-wider">
                      {step.n}
                    </span>
                    <div className="min-w-0 pt-0.5 md:pt-0">
                      <h3 className="text-sm font-semibold tracking-tight text-[#171717] md:mt-3 md:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-snug text-[#525252] md:mt-2 md:text-base md:leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-10 hidden justify-center md:flex">
              <WhatsappLink
                className="rounded-full bg-[#1B6CA8] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#2280C4]"
                message="Olá! Quero começar pelo passo 1 — preciso de ajuda."
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
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0A3550] md:text-4xl">
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
            <h2 className="mt-2 text-center text-2xl font-semibold tracking-tight text-[#0A3550] md:text-4xl">
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
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[18px] bg-[#0A3550] px-6 py-12 text-center md:px-12 md:py-16">
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

      <footer className="bg-[#0A3550] text-white">
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
