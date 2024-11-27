import { FastifyReply, FastifyRequest } from 'fastify';
import { config } from '../../config';

export class LoginController {
  public static async handle(req: FastifyRequest, res: FastifyReply) {
    const authUrl = `${config.keycloak.baseUrl}/realms/${config.keycloak.realm}/protocol/openid-connect/auth`;
    const params = new URLSearchParams({
      client_id: config.keycloak.clientId,
      redirect_uri: config.keycloak.redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
    });
    res.redirect(`${authUrl}?${params.toString()}`);
  }
}
