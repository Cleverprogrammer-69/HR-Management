import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('accessToken')?.value;

  console.log('Middleware triggered');
  console.log('Pathname:', pathname);
  console.log('AccessToken:', accessToken ? 'Present' : 'Absent');

  const isAccessTokenValid = accessToken ? decodeToken(accessToken) : false;
  console.log('Is Access Token Valid:', isAccessTokenValid);

  if (!isAccessTokenValid) {
    const authUrls = ['/login', '/signup'];
    if (!authUrls.includes(pathname)) {
      // const loginUrl = req.nextUrl.clone();
      // loginUrl.pathname = '/login';
      console.log('Redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {
    if (pathname === '/login' || pathname === '/signup') {
      const homeUrl = req.nextUrl.clone();
      homeUrl.pathname = '/';
      console.log('Redirecting to /');
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  console.log('Proceeding with request');
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
