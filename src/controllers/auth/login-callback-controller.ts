import { config } from '../../config';
import { OAuth2Client } from './../../clients/oauth2-client';
import { FastifyReply, FastifyRequest } from 'fastify';

export class LoginCallbackController {
  private oAuth2Client: OAuth2Client;

  public constructor(oAuth2Client: OAuth2Client) {
    this.oAuth2Client = oAuth2Client;
  }

  public async handle(req: FastifyRequest<{ Querystring: { code: string } }>, res: FastifyReply) {
    try {
      const code = req.query.code;

      if (!code) {
        res.status(400).send({
          status: 400,
          message: 'Authorization code not provided',
        });
        return;
      }

      const accessToken = await this.oAuth2Client.getAccessToken(code);

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
