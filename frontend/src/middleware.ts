import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('accessToken')?.value;
  const isAccessTokenValid = accessToken ? decodeToken(accessToken) : false;

  if (!isAccessTokenValid) {
    // If the token is invalid and user is not on an auth page, redirect to /login
    const authUrls = ['/login', '/signup'];
    if (!authUrls.includes(pathname)) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }
  } else {
    // If token is valid and trying to access login or signup, redirect to home
    if (pathname === '/login' || pathname === '/signup') {
      const homeUrl = req.nextUrl.clone();
      homeUrl.pathname = '/';
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signup',
    '/login',
    '/',
    '/employee',
    '/employee/:path*',
    '/department',
    '/department/:path*',
    '/designation',
    '/designation/:path*',
    '/jobType',
    '/jobType/:path*',
    '/jobNature',
    '/jobNature/:path*',
  ],
};

function decodeToken(token: string): boolean {
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
