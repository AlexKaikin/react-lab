import nodemailer from 'nodemailer'
import { env } from '@/shared/lib/env'

type SendEmailParams = {
  to: string
  subject: string
  html: string
}

export const sendEmail = ({ to, subject, html }: SendEmailParams) => {
  const transporter = nodemailer.createTransport({
    host: env('EMAIL_HOST'),
    port: Number(env('EMAIL_PORT')),
    secure: env('EMAIL_SECURE') === 'true',
    auth: { user: env('EMAIL_USER'), pass: env('EMAIL_PASSWORD') },
  })

  return transporter.sendMail({ from: env('EMAIL_FROM'), to, subject, html })
}
