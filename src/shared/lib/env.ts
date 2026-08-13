type Env =
  | 'DATABASE_URL'
  | 'NEXT_PUBLIC_SITE_URL'
  | 'NEXTAUTH_SECRET'
  | 'EMAIL_HOST'
  | 'EMAIL_PORT'
  | 'EMAIL_SECURE'
  | 'EMAIL_USER'
  | 'EMAIL_PASSWORD'
  | 'EMAIL_FROM'

export const env = (name: Env): string => {
  const value = process.env[name]

  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}
