import type { ComponentType, FC, LazyExoticComponent } from 'react'
import type { ModalProps } from '../ui/modal'

export type OpenModalParams = {
  id?: string
  component: ComponentType<{ onClose: () => void }> | LazyExoticComponent<FC<ModalProps>>
  props?: Record<string, unknown>
}
