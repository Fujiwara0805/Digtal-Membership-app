import NextAuth from "next-auth";
import LineProvider from "next-auth/providers/line";
import { AuthOptions } from "next-auth";

// Supabaseアダプターの問題かもしれないため、一時的に無効化して確認
export const authOptions: AuthOptions = {
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),
  ],
  // adapter: SupabaseAdapter({...}), // 一時的にコメントアウト
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // カスタムログインページ
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', // デバッグモード有効化
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
