import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function createPageUrl(pageName: string) {
    return '/' + pageName.replace(/ /g, '-');
}

export function cn(...inputs: any) {
  return twMerge(clsx(inputs));
} 

export const isIframe = false;

