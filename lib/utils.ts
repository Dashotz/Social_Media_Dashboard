/**
 * Utility function for merging Tailwind CSS classes
 * Currently unused but kept for future use or conditional styling
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

