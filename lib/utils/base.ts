import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function createPageUrl(pageName: string) {
    return '/' + pageName.replace(/ /g, '-');
}

export function cn(...inputs: any) {
  return twMerge(clsx(inputs));
} 

export function renderFieldOptionValue(originValue: string) {
  if (typeof originValue === 'string') {
    return originValue.split("").map((letter, index) => index === 0 ? letter.toUpperCase() : letter).join("");
  }

  return originValue;
};

const chemistryColors = {
  AGM: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  GEL: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

export function getChemistryColor(value: string) {
  return (chemistryColors as any)[value];
}

export const isIframe = false;

