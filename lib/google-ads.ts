export const GOOGLE_ADS_ID = "AW-18500346547";
export const WHATSAPP_CONVERSION_SEND_TO =
  "AW-18500346547/wKfvCIf7yZUdELPF0_VE";

type Gtag = (...args: unknown[]) => void;

export function trackWhatsappConversion() {
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", "conversion", {
    send_to: WHATSAPP_CONVERSION_SEND_TO,
  });

  gtag("event", "whatsapp_click", {
    method: "whatsapp",
  });
}
