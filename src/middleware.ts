// middleware.ts
import { NextRequest, NextResponse } from "next/server"

// Create a middleware function without withAuth first
export function middleware(req:NextRequest) {
  const path = req.nextUrl.pathname
  
  // Get auth status from cookie to avoid redirect loops
  const isAuthenticated = !!req.cookies.get('next-auth.session-token')

  // Always allow access to auth routes
  if (path.startsWith("/auth")) {
    if (isAuthenticated) {
      // If user is already logged in, redirect them away from auth pages
      return NextResponse.redirect(new URL("/admin/dashboard", req.url))
    }
    return NextResponse.next()
  }

  // Protect admin routes
  if (path.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Configure matcher to specify which routes to handle
export const config = {
  matcher: [
    // Match auth and admin routes, exclude api and static files
    "/auth/:path*",
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
}