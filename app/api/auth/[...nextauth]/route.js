import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // Only allow @gladly.com emails
      if (profile.email.endsWith("@gladly.com")) {
        return true
      }
      return false
    },
  },
})

export { handler as GET, handler as POST }
