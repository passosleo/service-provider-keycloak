import { FastifyReply, FastifyRequest } from 'fastify';
import { KeycloakOAuth2Client } from '../../clients/keycloak-oauth2-client';
import { config } from '../../config';
import { OAuth2Client } from '../../clients/oauth2-client';

export class LoginController {
  public static async handle(req: FastifyRequest, res: FastifyReply) {
    const oAuth2Client: OAuth2Client = new KeycloakOAuth2Client(
      config.keycloak,
    );

    try {
      res.redirect(oAuth2Client.getAuthenticatorUrl());
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: 500,
        message: 'An unexpected error occurred',
      });
    }
  }
}
