export const USER_TOKEN = '_accessToken';

const JWT_SECRET_KEY: string | undefined = process.env.JWT_ACCESS_SECRET!;

export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.');
  }

  return JWT_SECRET_KEY;
}
