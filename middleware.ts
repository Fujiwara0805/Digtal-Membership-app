import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

// 保護が必要なルートを指定
export const config = {
  matcher: ["/profile/:path*", "/membership/:path*", "/booking/:path*"],
};
