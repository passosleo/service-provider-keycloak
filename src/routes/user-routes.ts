import { FastifyInstance } from 'fastify';
import { GetUserInfoController } from '../controllers/user/get-user-info-controller';
import { KeycloakOAuth2Client } from '../clients/keycloak-oauth2-client';
import { config } from '../config';

export async function userRoutes(app: FastifyInstance) {
  const oAuth2Client = new KeycloakOAuth2Client(config.keycloak);

  app.get('/user', new GetUserInfoController(oAuth2Client).handle);
}
