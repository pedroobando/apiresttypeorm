import dotEnv from 'dotenv';
dotEnv.config({ path: '.env' });

export const PORT = process.env.PORT || '8000';

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://localhost:27021/servidentmj?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

export const SECRET_JWT = process.env.SECRET_JWT || 'holamundo';
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '2h';

export const CLOUD_NAME = process.env.CLOUD_NAME || 'elsecreto';
export const CLOUD_KEY = process.env.CLOUD_KEY || 'elsecreto';
export const CLOUD_SECRET = process.env.CLOUD_SECRET || 'elsecreto';

const CORS_LIST_URI = process.env.CORS_LIST_URI || '*';
export const WHITE_LIST = CORS_LIST_URI.split('|');
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const USER_EMAIL = process.env.USER_EMAIL || '';
export const PASS_EMAIL = process.env.PASS_EMAIL || '';

export const COMPANY_NAME = process.env.COMPANY_NAME || '';
export const COMPANY_EMAIL = process.env.COMPANY_EMAIL || '';
