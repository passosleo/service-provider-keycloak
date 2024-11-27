import { FastifyInstance } from 'fastify';
import { LoginController } from '../controllers/auth/login-controller';
import { LoginCallbackController } from '../controllers/auth/login-callback-controller';
import { LogoutController } from '../controllers/auth/logout-controller';
import { KeycloakOAuth2Client } from '../clients/keycloak-oauth2-client';
import { config } from '../config';

export async function authRoutes(app: FastifyInstance) {
  const oAuth2Client = new KeycloakOAuth2Client(config.keycloak);

  app.get('/', (_, res) => res.sendFile('login.html'));
  app.get('/login', new LoginController(oAuth2Client).handle);
  app.get('/callback', new LoginCallbackController(oAuth2Client).handle);
  app.get('/logout', new LogoutController(oAuth2Client).handle);
}
