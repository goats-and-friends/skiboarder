import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

function isLoginPage(req: NextRequest): boolean {
  const path = req.nextUrl.pathname;
  return path === "/login" || path === "/register" || path === "/";
}

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    if (isLoginPage(req) && !!token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        return isLoginPage(req) || !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/initial-survey", "/", "/register", "/login"],
};
