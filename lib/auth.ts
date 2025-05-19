import LineProvider from "next-auth/providers/line";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: {
    strategy: "jwt", // JWTセッション戦略を推奨
  },
  callbacks: {
    async session({ session, token }) {
      // token.sub にはSupabaseのユーザーIDが入ります
      if (token.sub && session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // セッション暗号化のためのシークレットキー
};
