import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken"); // Check for auth token

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login
  }

  return NextResponse.next(); // Allow request if authenticated
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/books/:path*"], // Protects `/books` and subroutes
};