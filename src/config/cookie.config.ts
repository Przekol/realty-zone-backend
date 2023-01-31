import * as dotenv from 'dotenv';
dotenv.config();
import { CookieOptions } from 'express';

export const COOKIE_OPTIONS: CookieOptions = {
  maxAge: 0,
  secure: false,
  domain: process.env.FRONTEND_DOMAIN,
  httpOnly: true,
};
