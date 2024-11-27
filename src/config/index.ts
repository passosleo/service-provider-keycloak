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
    port: Number(process.env.PORT) || 4000,
    sessionCookieName: 'accessToken',
  },
  keycloak: {
    baseUrl: requiredEnv(process.env.KEYCLOAK_BASE_URL),
    realm: requiredEnv(process.env.KEYCLOAK_REALM),
    clientId: requiredEnv(process.env.KEYCLOAK_CLIENT_ID),
    clientSecret: requiredEnv(process.env.KEYCLOAK_CLIENT_SECRET),
    redirectUri: requiredEnv(process.env.KEYCLOAK_REDIRECT_URI),
  },
};
