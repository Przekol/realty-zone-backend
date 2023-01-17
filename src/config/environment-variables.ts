import * as Joi from 'joi';

export const getValidationEnvironmentVariables = () => {
  return Joi.object({
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_COLLATION: Joi.string().required(),
    POSTGRES_ENCODING: Joi.string().required(),
    APP_PORT: Joi.number().required(),
    APP_HOSTNAME: Joi.string().required(),
  });
};
