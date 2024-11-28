import { FastifyInstance } from 'fastify';
import { GetUserInfoController } from '../controllers/user/get-user-info-controller';

export async function userRoutes(app: FastifyInstance) {
  app.get('/user', GetUserInfoController.handle);
}
