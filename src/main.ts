import path from 'path';
import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fastifyCookie from '@fastify/cookie';
import fastifyStatic from '@fastify/static';
import { authRoutes } from './routes/auth-routes';
import { userRoutes } from './routes/user-routes';
import { config } from './config';

export function buildApp() {
  const app = Fastify();

  // Setup middlewares
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
  });
  app.register(fastifyCookie);
  app.register(fastifyMultipart);

  // Setup routes
  app.register(authRoutes);
  app.register(userRoutes);

  return app;
}

if (require.main === module) {
  const app = buildApp();

  app.listen({ port: config.app.port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info(`Server listening at ${address}`);
  });
}
