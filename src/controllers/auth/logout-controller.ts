import { FastifyReply, FastifyRequest } from 'fastify';
import { OAuth2Client } from '../../clients/oauth2-client';
import { config } from '../../config';

export class LogoutController {
  private oAuth2Client: OAuth2Client;

  public constructor(oAuth2Client: OAuth2Client) {
    this.oAuth2Client = oAuth2Client;
  }

  public async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      res.clearCookie(config.app.sessionCookieName).redirect(this.oAuth2Client.getLogoutUrl('/'));
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: 500,
        message: 'An unexpected error occurred',
      });
    }
  }
}
