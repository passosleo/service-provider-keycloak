import { FastifyReply, FastifyRequest } from 'fastify';
import { config } from '../../config';

export class LoginCallbackController {
  public static async handle(req: FastifyRequest<{ Querystring: { code: string } }>, res: FastifyReply) {
    const code = req.query.code;

    if (!code) {
      res.status(400).send('Código de autenticação não fornecido.');
      return;
    }

    try {
      const tokenUrl = `${config.keycloak.baseUrl}/realms/${config.keycloak.realm}/protocol/openid-connect/token`;
      const tokenResponse = await axios.post(
        tokenUrl,
        new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: config.keycloak.redirectUri,
          client_id: config.keycloak.clientId,
          client_secret: config.keycloak.clientSecret,
        }).toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      const { access_token } = tokenResponse.data;

      const userInfoUrl = `${config.keycloak.baseUrl}/realms/${config.keycloak.realm}/protocol/openid-connect/userinfo`;
      const userInfoResponse = await axios.get(userInfoUrl, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      res
        .setCookie('userinfo', JSON.stringify(userInfoResponse.data), {
          httpOnly: true,
          secure: false,
        })
        .redirect('/user');
    } catch (err) {
      res.status(500).send('Erro ao autenticar com Keycloak.');
    }
  }
}
