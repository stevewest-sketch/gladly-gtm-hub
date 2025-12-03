// middleware.js (protects all routes)
export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    // Protect everything except /api/auth and static files
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}
