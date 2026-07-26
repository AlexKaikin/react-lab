import type { FC, LazyExoticComponent } from 'react'
import type { ModalProps } from '../ui/modal'

export type ModalContentProps = Omit<ModalProps, 'children' | 'aria-label'>
type ExtraProps<P> = Omit<P, keyof ModalContentProps>

export type OpenModalParams<P extends ModalContentProps = ModalContentProps> = {
  component: LazyExoticComponent<FC<P>>
} & (keyof ExtraProps<P> extends never ? { props?: never } : { props: ExtraProps<P> })
