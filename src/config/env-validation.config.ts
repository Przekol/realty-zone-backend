import * as Joi from 'joi';

export const envValidation = Joi.object({
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_COLLATION: Joi.string().required(),
  POSTGRES_ENCODING: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  APP_HOSTNAME: Joi.string().required(),
  JWT_SECRET_AUTHENTICATION_TOKEN: Joi.string().required(),
  JWT_EXPIRATION_TIME_AUTHENTICATION_TOKEN: Joi.number().required(),
  FRONTEND_DOMAIN: Joi.string().required(),
  JWT_SECRET_REFRESH_TOKEN: Joi.string().required(),
  JWT_EXPIRATION_TIME_REFRESH_TOKEN: Joi.number().required(),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_CONFIRMATION_URL: Joi.string().required(),
  JWT_SECRET_VERIFICATION_TOKEN: Joi.string().required(),
  JWT_EXPIRATION_TIME_VERIFICATION_TOKEN: Joi.number().required(),
  CLIENT_URL: Joi.string().required(),
});
