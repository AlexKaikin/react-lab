type FieldErrorProps = {
  message: string
}

export const FieldError = ({ message }: FieldErrorProps) => (
  <span className="text-xs leading-tight text-semantic-error">{message}</span>
)
