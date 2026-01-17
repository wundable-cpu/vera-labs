import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true, // Allow NextAuth to work without explicit AUTH_URL in development
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      checks: ["none"], // Add this line here
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          // This specific 'scope' allows our AI to read Analytics data later
          scope: "openid profile email https://www.googleapis.com/auth/analytics.readonly"
        }
      }
    }),
  ],
  // 2. Force trust for the local development host
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      if (session && token.accessToken) {
        (session as any).accessToken = token.accessToken
      }
      return session
    },
  },
})