import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup'
  console.log("Cookies in middleware", req.cookies.getAll())
  console.log(req.headers)
  console.log('Middleware triggered');
  console.log('Pathname:', path);

  const isAccessTokenValid = await verifyAuth(req).catch(err=>{
    console.log(err)
  });
  console.log('Is Access Token Valid:', isAccessTokenValid);
  if (!isAccessTokenValid) {
    // if this an API request, respond with JSON
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    // otherwise, redirect to the set token page
    // else {
    //   return NextResponse.redirect(new URL('/', req.url));
    // }
  }

 

  console.log('Proceeding with request');
  // return NextResponse.next();
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

// function decodeToken(token: string): boolean {
//   try {
//     const decodedToken = jwt.decode(token) as jwt.JwtPayload;

//     if (!decodedToken || !decodedToken.exp) {
//       return false;
//     }

//     const currentTime = Math.floor(Date.now() / 1000);
//     return decodedToken.exp > currentTime;
//   } catch (err) {
//     console.error('Token decoding error:', err);
//     return false;
//   }
// }
