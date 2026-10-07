import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

type WhatsappLinkProps = {
  children: React.ReactNode;
  message?: string;
  className?: string;
  showIcon?: boolean;
};

export function WhatsappLink({
  children,
  message,
  className = "",
  showIcon = true,
}: WhatsappLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 transition-colors duration-200 ${className}`}
    >
      {showIcon ? <MessageCircle className="h-4 w-4 shrink-0" aria-hidden /> : null}
      {children}
    </a>
  );
}
