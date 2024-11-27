import { FastifyReply, FastifyRequest } from 'fastify';

export class GetUserInfoController {
  public static async handle(req: FastifyRequest, res: FastifyReply) {
    const userInfoCookie = req.cookies.userinfo;

    if (!userInfoCookie) {
      res.redirect('/');
      return;
    }

    const userInfo = JSON.parse(userInfoCookie);

    res.type('text/html').send(`
      <h1>Informações do Usuário</h1>
      <p><strong>Nome:</strong> ${userInfo.name}</p>
      <p><strong>Email:</strong> ${userInfo.email}</p>
      <a href="/logout">Logout</a>
    `);
  }
}
