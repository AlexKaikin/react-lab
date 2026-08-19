'use client'

import { useId } from 'react'

export const useFieldId = (id?: string) => {
  const generatedId = useId()

  return id ?? generatedId
}
