import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const BRAND_HEADING_SIZES = ["lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"];
const BRAND_BODY_SIZES = ["xs", "sm", "md"];

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      font: ["brand-heading", "brand-body"],
      "font-weight": ["brand-heading-weight", "brand-body-weight"],
      text: [
        ...BRAND_HEADING_SIZES.map((size) => `brand-heading-${size}`),
        ...BRAND_BODY_SIZES.map((size) => `brand-body-${size}`),
      ],
      leading: [
        ...BRAND_HEADING_SIZES.map((size) => `brand-heading-${size}`),
        ...BRAND_BODY_SIZES.map((size) => `brand-body-${size}`),
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
