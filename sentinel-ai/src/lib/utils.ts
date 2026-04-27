import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitário padrão do shadcn/ui.
 * Combina `clsx` (para condicionais) com `tailwind-merge`
 * (que resolve conflitos entre classes Tailwind).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
