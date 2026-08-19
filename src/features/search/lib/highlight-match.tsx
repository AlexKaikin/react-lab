import type { ReactNode } from 'react'

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const highlightMatch = (text: string, query: string): ReactNode => {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) return text

  const parts = text.split(new RegExp(`(${escapeRegExp(trimmedQuery)})`, 'gi'))
  let offset = 0

  return parts.map((part) => {
    const key = `${offset}-${part}`
    offset += part.length

    if (part.toLowerCase() !== trimmedQuery.toLowerCase()) return part

    return (
      <mark key={key} className="bg-transparent text-semantic-info">
        {part}
      </mark>
    )
  })
}
