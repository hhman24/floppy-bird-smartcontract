import { env } from '~/configs/enviroment';

export const WHITELIST_DOMAINS = [
  // `http://${env.APP_HOST}:${env.APP_PORT}`,
  `http://${env.APP_HOST}:${3000}`,
];
