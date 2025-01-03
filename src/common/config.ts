import * as joi from 'types-joi';

export const APP_CONFIG_SCHEMA = joi.object({
  USER_JWT_SECRET_KEY: joi.string().required(),
  POSTGRES_URI: joi.string().required(),
});

export type APP_CONFIG_TYPE = joi.InterfaceFrom<typeof APP_CONFIG_SCHEMA>;
