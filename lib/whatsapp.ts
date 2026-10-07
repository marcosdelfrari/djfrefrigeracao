export const WHATSAPP_NUMBER = "5531986320063";
export const PHONE_DISPLAY = "+55 31 98632-0063";
export const PHONE_SECONDARY = "31 97540-9031";
export const ADDRESS_LINE =
  "Rua Padre Pedro Pinto, 2222 — Venda Nova, Belo Horizonte";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua+Padre+Pedro+Pinto+2222,+Venda+Nova,+Belo+Horizonte";

export function whatsappUrl(message?: string) {
  const text =
    message ??
    "Olá, Vim pelo site, pode passar mais informações?";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
