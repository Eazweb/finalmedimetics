import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const runtime = "edge";

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
      ];
      const { pathname } = request.nextUrl;

      // Check if the request origin is allowed
      const allowedOrigins = [
        process.env.NEXTAUTH_URL,
        process.env.SECONDARY_URL,
        process.env.PRIMARY_URL,
        "http://localhost:3000",
      ];

      const origin = request.headers.get("origin");
      if (origin && !allowedOrigins.includes(origin)) {
        return false;
      }

      if (protectedPaths.some((p) => p.test(pathname))) return !!auth;
      return true;
    },
  },
} satisfies NextAuthConfig;

// Create auth middleware
const { auth } = NextAuth(authConfig);

// Export middleware function
export default auth((req) => {
  return NextResponse.next();
});

// Export config with updated matcher and runtime
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
