import 'dotenv/config';

function requiredEnv(key?: string) {
  if (!key) {
    throw new Error('Environment variable key not provided.');
  }
  const value = process.env[key];
  if (!value) {
    throw new Error(`Value for environment variable ${key} not provided.`);
  }
  return value;
}

export const config = {
  app: {
    environment: process.env.NODE_ENV || 'development',
    host: requiredEnv('APP_HOST'),
    port: Number(process.env.PORT) || 4000,
    get baseUrl() {
      return `${this.host}:${this.port}`;
    },
    sessionCookieName: 'accessToken',
  },
  keycloak: {
    baseUrl: requiredEnv('KEYCLOAK_BASE_URL'),
    realm: requiredEnv('KEYCLOAK_REALM'),
    clientId: requiredEnv('KEYCLOAK_CLIENT_ID'),
    clientSecret: requiredEnv('KEYCLOAK_CLIENT_SECRET'),
    redirectUri: requiredEnv('KEYCLOAK_REDIRECT_URI'),
  },
};
