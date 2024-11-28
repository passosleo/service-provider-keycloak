import { KeycloakOAuth2Client } from '../../clients/keycloak-oauth2-client';
import { OAuth2Client } from '../../clients/oauth2-client';
import { config } from '../../config';
import { FastifyReply, FastifyRequest } from 'fastify';

export class LoginCallbackController {
  public static async handle(
    req: FastifyRequest<{ Querystring: { code: string } }>,
    res: FastifyReply,
  ) {
    const oAuth2Client: OAuth2Client = new KeycloakOAuth2Client(
      config.keycloak,
    );

    try {
      const code = req.query.code;

      if (!code) {
        res.status(400).send({
          status: 400,
          message: 'Authorization code not provided',
        });
        return;
      }

      const accessToken = await oAuth2Client.getAccessToken(code);

      res
        .setCookie(config.app.sessionCookieName, accessToken, {
          httpOnly: true,
          secure: false,
        })
        .redirect('/user');
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: 500,
        message: 'An unexpected error occurred',
      });
    }
  }
}
