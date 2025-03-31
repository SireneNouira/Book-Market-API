import { NextResponse } from "next/server";
import { parseCookies } from "nookies";

export function middleware(req) {
  const cookies = parseCookies({ req });
  const token = cookies.jwt;

  // Liste des pages protégées
  const protectedRoutes = ["/profil"];

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Appliquer le middleware uniquement sur certaines routes
export const config = {
  matcher: ["/profil"], // Routes protégées
};
