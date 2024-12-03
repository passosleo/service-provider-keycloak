import { FastifyReply, FastifyRequest } from 'fastify';
import { config } from '../../config';
import { KeycloakOAuth2Client } from '../../clients/keycloak-oauth2-client';
import { OAuth2Client } from '../../clients/oauth2-client';

export class LogoutController {
  public static async handle(req: FastifyRequest, res: FastifyReply) {
    const oAuth2Client: OAuth2Client = new KeycloakOAuth2Client(
      config.keycloak,
    );

    try {
      res
        .clearCookie(config.app.sessionCookieName)
        .redirect(await oAuth2Client.getLogoutUrl(config.app.baseUrl));
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: 500,
        message: 'An unexpected error occurred',
      });
    }
  }
}
