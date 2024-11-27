import { FastifyReply, FastifyRequest } from 'fastify';
import { config } from '../../config';

export class LogoutController {
  public static async handle(req: FastifyRequest, res: FastifyReply) {
    res
      .clearCookie('userinfo')
      .redirect(
        `${config.keycloak.baseUrl}/realms/${config.keycloak.realm}/protocol/openid-connect/logout?redirect_uri=/`,
      );
  }
}
