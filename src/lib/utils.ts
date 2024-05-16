import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  let res = str.charAt(0).toUpperCase() + str.slice(1);
  if (res.indexOf("-") !== -1) {
    res = res.replace(/-./g, (x) => x.toUpperCase());
  }
  return res;
}
