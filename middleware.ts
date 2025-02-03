import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'

const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping/,
        /\/payment/,
        /\/place-order/,
        /\/profile/,
        /\/order\/(.*)/,
        /\/admin/,
      ]
      const { pathname } = request.nextUrl
      
      // Check if the request origin is allowed
      const allowedOrigins = [
        process.env.NEXTAUTH_URL,
        process.env.SECONDARY_URL,
        process.env.PRIMARY_URL,
        'http://localhost:3000'
      ]
      
      const origin = request.headers.get('origin')
      if (origin && !allowedOrigins.includes(origin)) {
        return false
      }

      if (protectedPaths.some((p) => p.test(pathname))) return !!auth
      return true
    },
  },
} satisfies NextAuthConfig

export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}