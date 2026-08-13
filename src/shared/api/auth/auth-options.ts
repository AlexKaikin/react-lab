import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail, verifyPassword } from '@/entities/user'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await getUserByEmail(credentials.email)
        if (!user || !user.isActive) return null

        const isValid = await verifyPassword(credentials.password, user.password)
        if (!isValid) return null

        return { id: user.id, email: user.email, firstName: user.firstName, roles: user.roles, isActive: user.isActive }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.roles = user.roles
        token.isActive = user.isActive
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.firstName = token.firstName
      session.user.roles = token.roles
      session.user.isActive = token.isActive

      return session
    },
  },
}
