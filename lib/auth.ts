import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from './dbConnect'
import UserModel from './models/UserModel'
import NextAuth from 'next-auth'

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()
        if (credentials == null) return null

        const user = await UserModel.findOne({ email: credentials.email })

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            return user
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/signin',
  },
  callbacks: {
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        }
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
        }
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user
      }
      return session
    },
    async redirect({ url, baseUrl }:{ url: string, baseUrl: string }) {
      const allowedOrigins = [
        process.env.NEXTAUTH_URL,
        process.env.SECONDARY_URL,
        process.env.PRIMARY_URL,
        'http://localhost:3000'
      ]
      
      if (url.startsWith('/')) return `${baseUrl}${url}`
      
      const urlOrigin = new URL(url).origin
      if (allowedOrigins.includes(urlOrigin)) {
        return url
      }
      
      return baseUrl
    }
  },
  trustHost: true,
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)