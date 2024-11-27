import { FastifyReply, FastifyRequest } from 'fastify';
import { OAuth2Client } from '../../clients/oauth2-client';

export class GetUserInfoController {
  private oAuth2Client: OAuth2Client;

  public constructor(oAuth2Client: OAuth2Client) {
    this.oAuth2Client = oAuth2Client;
  }

  public async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        res.redirect('/');
        return;
      }

      const userInfo = await this.oAuth2Client.getUserInfo(accessToken);

      res.type('text/html').send(`
      <h1>Informações do Usuário</h1>
      <p><strong>Nome:</strong> ${userInfo.name}</p>
      <p><strong>Email:</strong> ${userInfo.email}</p>
      <a href="/logout">Logout</a>
    `);
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: 500,
        message: 'An unexpected error occurred',
      });
    }
  }
}
