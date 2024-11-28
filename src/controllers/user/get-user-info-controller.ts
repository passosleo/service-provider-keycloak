import { FastifyReply, FastifyRequest } from 'fastify';
import { KeycloakOAuth2Client } from '../../clients/keycloak-oauth2-client';
import { config } from '../../config';
import { OAuth2Client } from '../../clients/oauth2-client';
import { renderHtml } from '../../utils/html';

export class GetUserInfoController {
  public static async handle(req: FastifyRequest, res: FastifyReply) {
    const oAuth2Client: OAuth2Client = new KeycloakOAuth2Client(
      config.keycloak,
    );

    try {
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        res.redirect('/');
        return;
      }

      const userInfo = await oAuth2Client.getUserInfo(accessToken);

      res.type('text/html').send(
        renderHtml('user-info.html', {
          name: userInfo.name,
          email: userInfo.email,
        }),
      );
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: 500,
        message: 'An unexpected error occurred',
      });
    }
  }
}
