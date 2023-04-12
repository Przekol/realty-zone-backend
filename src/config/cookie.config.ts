import * as dotenv from 'dotenv';
dotenv.config();
import { CookieOptions } from 'express';

export const cookieOptions: CookieOptions = {
  maxAge: 0,
  secure: false,
  domain: process.env.APP_HOSTNAME,
  httpOnly: true,
};
