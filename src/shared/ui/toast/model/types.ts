export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export type ToastItem = {
  id: string
  message: string
  variant: ToastVariant
  autoClose: number | false
}

export type AddToastParams = {
  message: string
  variant: ToastVariant
  autoClose?: number | false
}
