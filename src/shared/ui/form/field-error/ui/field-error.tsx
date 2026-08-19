type FieldErrorProps = {
  message: string
  id?: string
}

export const FieldError = ({ message, id }: FieldErrorProps) => (
  <span id={id} className="text-xs leading-tight text-semantic-error">
    {message}
  </span>
)
