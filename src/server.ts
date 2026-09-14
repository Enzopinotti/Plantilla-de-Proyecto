import { buildApp } from './app.js';
import { loadConfig } from './config.js';

async function start(): Promise<void> {
  const config = loadConfig();
  const app = buildApp(config);
  let shuttingDown = false;

  const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
    if (shuttingDown) return;
    shuttingDown = true;

    app.log.info({ signal }, 'shutdown requested');

    try {
      await app.close();
    } catch (error) {
      app.log.error({ err: error }, 'graceful shutdown failed');
      process.exitCode = 1;
    }
  };

  process.once('SIGINT', () => void shutdown('SIGINT'));
  process.once('SIGTERM', () => void shutdown('SIGTERM'));

  try {
    await app.listen({ host: config.HOST, port: config.PORT });
  } catch (error) {
    app.log.error({ err: error }, 'service failed to start');
    process.exitCode = 1;
    await app.close();
  }
}

void start();
