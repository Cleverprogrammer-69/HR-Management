import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup'
  const response = NextResponse.next();
  let token = '';
  console.log("Cookies in middleware", req.cookies.getAll())
  console.log(req.headers)
  console.log('Middleware triggered');
  console.log('Pathname:', path);

  const isAccessTokenValid = await verifyAuth(req).catch(err=>{
    console.log(err)
  });
  console.log('Is Access Token Valid:', isAccessTokenValid);
  if (!isAccessTokenValid) {
    console.log('invalid token.')
    // if this an API request, respond with JSON
    if (!isPublicPath) {
      console.log('invalid token and private path access requested.')
      return NextResponse.redirect(new URL('/login', req.url))
    }
  } else {
    console.log('valid token')
    token = req.cookies.get('accessToken')?.value || ""
    console.log("token : ", token)
    response.cookies.set('accessToken', token);
    if (isPublicPath) {
      console.log('valid token and public path access requested.')
      
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

 

  console.log('Proceeding with request');
  return response;
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
