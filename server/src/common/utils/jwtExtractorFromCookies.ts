import { JwtFromRequestFunction } from 'passport-jwt';
import { Request } from 'express';

export const jwtExtractorFromCookies: JwtFromRequestFunction = (
  req: Request,
): string | null => {
  try {
    // console.log('req >> ', req);
    // return 'JWT';
    const jwt = req.cookies['jwt'];
    console.log('req jwt >> ', jwt);

    return jwt;
  } catch (err) {
    console.error(err);
  }
};
