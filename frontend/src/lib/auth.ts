import type { NextRequest, NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { USER_TOKEN, getJwtSecretKey } from './constants';
import { StringHeaderIdentifier } from '@tanstack/react-table';

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export class AuthError extends Error {}

export async function verifyAuth(token: string) {
  // const token = req.cookies.get(USER_TOKEN)?.value;

  if (!token) throw new AuthError('Missing user token');
  console.log("verifyAuth triggered")
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
      {}
    );
    console.log('Verified ? :', verified.payload as UserJwtPayload);
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new AuthError('Your token has expired.');
  }
}
