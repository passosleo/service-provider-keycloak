import { FastifyInstance } from 'fastify';
import { LoginController } from '../controllers/auth/login-controller';
import { LoginCallbackController } from '../controllers/auth/login-callback-controller';
import { LogoutController } from '../controllers/auth/logout-controller';

export async function authRoutes(app: FastifyInstance) {
  app.get('/', (_, res) => res.sendFile('login.html'));
  app.get('/login', LoginController.handle);
  app.get('/callback', LoginCallbackController.handle);
  app.get('/logout', LogoutController.handle);
}
