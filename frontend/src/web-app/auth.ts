import NextAuth, { Profile } from "next-auth";
import DuendeIdentityServer6 from "@auth/core/providers/duende-identity-server6";
import { OIDCConfig } from "@auth/core/providers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    DuendeIdentityServer6({
      id: "id-server",
      clientId: "nextapp",
      clientSecret: "secrets",
      issuer: "http://localhost:5001",
      authorization: {
        params: {
          scope: "openid profile auctionApp",
        },
      },
      idToken: true,
    } as OIDCConfig<Omit<Profile, "username">>),
  ],
  callbacks: {
    async authorized({ auth }) {
      return !!auth;
    },
    async jwt({ token, profile, account }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        token.username = profile.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
