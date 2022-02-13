import { JwtFromRequestFunction } from 'passport-jwt';
import { Request } from 'express';

export const jwtExtractorFromCookies: JwtFromRequestFunction = (
  req: Request,
): string | null => {
  try {
    return req.cookies['jwt'];
  } catch (err) {
    console.error(err);
  }
};
