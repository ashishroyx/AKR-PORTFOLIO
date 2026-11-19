import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function formatMonthYear(date: string) {
  const [year, month] = date.split('-').map(Number)
  return new Date(year, (month ?? 1) - 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}