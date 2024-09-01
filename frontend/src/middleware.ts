import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup'
  const accessToken = req.cookies.get('accessToken')?.value;
  console.log("Cookies in middleware", req.cookies.getAll())
  console.log(req.headers)
  console.log('Middleware triggered');
  console.log('Pathname:', path);
  console.log('AccessToken:', accessToken ? 'Present' : 'Absent');

  const isAccessTokenValid = accessToken && await verifyAuth(accessToken).catch(err=>{
    console.log(err)
  });
  console.log('Is Access Token Valid:', isAccessTokenValid);
  if(isPublicPath && isAccessTokenValid){
    return NextResponse.redirect(new URL('/', req.url))
  }

  if(!isPublicPath && !isAccessTokenValid){
    return NextResponse.redirect(new URL('/login', req.url));
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
