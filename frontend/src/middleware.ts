import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';
import jwt from 'jsonwebtoken';
import path from 'path';
export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const accessToken = req.cookies.get('accessToken')?.value;
  const isAccessTokenValid = decodeToken(accessToken);
  if (!isAccessTokenValid) {
    // // If the token is invalid and user already on the login page,
    // // redirect to /login
    const authUrls = ['/login', '/signup']
    if (!authUrls.includes(pathname)) {
      const authUrl = new NextURL('/login', origin);
      return NextResponse.redirect(authUrl);
    }
  } else {
    // // If token is valid and trying to access login, redirect to home
    if (pathname === '/login' || pathname === "/signup") {
      const homeUrl = new NextURL('/', origin);
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/signup', '/login', '/'],
};
function decodeToken(token: string | undefined): boolean {
  try {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;

    if (!decodedToken || !decodedToken.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  } catch (err) {
    console.error('Token decoding error:', err);
    return false;
  }
}