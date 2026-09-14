import Fastify, { type FastifyInstance } from 'fastify';

import { loadConfig, type AppConfig } from './config.js';

const serviceName = 'node-service-starter';

export function buildApp(config: AppConfig = loadConfig()): FastifyInstance {
  const app = Fastify({
    logger: config.LOG_LEVEL === 'silent' ? false : { level: config.LOG_LEVEL },
  });

  app.get('/health', async () => ({
    status: 'ok',
    service: serviceName,
    environment: config.NODE_ENV,
  }));

  app.setNotFoundHandler(async (request, reply) => {
    return reply.status(404).send({
      error: {
        code: 'NOT_FOUND',
        message: `Route ${request.method} ${request.url} not found`,
      },
    });
  });

  app.setErrorHandler(async (error, request, reply) => {
    const requestedStatus = error.statusCode;
    const statusCode =
      typeof requestedStatus === 'number' && requestedStatus >= 400 && requestedStatus < 600
        ? requestedStatus
        : 500;

    request.log.error({ err: error }, 'request failed');

    return reply.status(statusCode).send({
      error: {
        code: statusCode >= 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
        message: statusCode >= 500 ? 'Internal Server Error' : error.message,
      },
    });
  });

  return app;
}
