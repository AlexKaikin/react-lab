import { twMerge } from 'tailwind-merge'

export const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return twMerge(classes.filter((item) => typeof item !== 'boolean' && item).join(' '))
}
