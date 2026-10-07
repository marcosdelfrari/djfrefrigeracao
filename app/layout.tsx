import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import { WebMcpProvider } from "@/components/webmcp-provider";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const mukta = Mukta({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "DJF Refrigeração | Assistência Técnica em BH",
  description:
    "Manutenção de geladeira de todas as marcas e ar-condicionado em Belo Horizonte e região. Atendimento domiciliar de segunda a domingo. Orçamento pelo WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${mukta.className} h-full antialiased`}>
      <body className="min-h-full bg-[#f7f9fc] text-[#171717]">
        <WebMcpProvider />
        {children}
      </body>
    </html>
  );
}
