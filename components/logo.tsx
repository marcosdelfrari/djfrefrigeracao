import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className = "h-10 w-auto", priority = false }: LogoProps) {
  return (
    <Image
      src="/djf.png"
      alt="DJF Refrigeração"
      width={220}
      height={120}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
