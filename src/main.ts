import path from 'path';
import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyStatic from '@fastify/static';
import { authRoutes } from './routes/auth-routes';
import { userRoutes } from './routes/user-routes';
import { config } from './config';

export function buildApp() {
  const app = Fastify();
  const staticFolder = path.join(__dirname, 'views');
  app.register(fastifyStatic, {
    root: staticFolder,
  });
  app.register(fastifyCookie);

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
    console.info(`Environment: ${config.app.environment}`);
    console.info(`Base URL: ${config.app.baseUrl}`);
  });
}
