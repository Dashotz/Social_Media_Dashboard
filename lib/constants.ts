/**
 * Shared constants for social media platforms
 */

export const platformIcons = {
  facebook: "📘",
  instagram: "📷",
  twitter: "🐦",
} as const;

export const platformNames = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter",
} as const;

export const platformColors = {
  facebook: "bg-blue-500",
  instagram: "bg-pink-500",
  twitter: "bg-sky-500",
} as const;

export const platformBadgeColors = {
  facebook: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  instagram: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  twitter: "bg-sky-500/20 text-sky-400 border-sky-500/30",
} as const;

export const platformCardColors = {
  facebook: "border-blue-500/30 bg-blue-500/10",
  instagram: "border-pink-500/30 bg-pink-500/10",
  twitter: "border-sky-500/30 bg-sky-500/10",
} as const;

export type Platform = keyof typeof platformIcons;

