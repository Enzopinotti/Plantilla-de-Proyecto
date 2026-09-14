# Plantilla de Proyecto — Node Service Starter

Starter minimalista y reusable para servicios HTTP en Node.js, pensado para arrancar proyectos nuevos con una base técnica moderna sin arrastrar dependencias de aplicaciones anteriores.

Este repositorio nació como una plantilla backend mucho más amplia. La versión actual conserva la idea original —tener un punto de partida reutilizable— pero la reduce a una base deliberadamente pequeña, testeable y extensible.

## Stack

- Node.js 22
- TypeScript
- Fastify 5
- Zod
- Vitest
- ESLint
- Prettier
- GitHub Actions

## Principios

- **mínimo por defecto**: autenticación, bases de datos, colas, uploads, sockets y correo se agregan sólo cuando un proyecto los necesita;
- **configuración validada**: las variables de entorno se parsean y validan antes de iniciar el servicio;
- **errores estructurados**: 404 y errores inesperados tienen contratos HTTP previsibles;
- **producción desde el inicio**: incluye health check y graceful shutdown;
- **reproducible**: `package-lock.json`, Node 22 y un único quality gate compartido por desarrollo y CI;
- **testeable sin infraestructura externa**: el baseline no necesita una base de datos ni servicios remotos para validarse.

## Inicio rápido

Requisitos:

- Node.js 22+
- npm 10+

```bash
cp .env.example .env
npm ci
npm run dev
```

El servicio inicia por defecto en `http://localhost:3000`.

### Health check

```http
GET /health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "service": "node-service-starter",
  "environment": "development"
}
```

## Variables de entorno

`.env.example` documenta todo el contrato actual:

```env
HOST=0.0.0.0
PORT=3000
LOG_LEVEL=info
```

`NODE_ENV` admite `development`, `test` o `production` y tiene un valor seguro por defecto para desarrollo.

No se versionan `.env` reales ni credenciales.

## Comandos

```bash
npm run dev          # servidor con watch
npm run build        # compila TypeScript a dist/
npm start            # ejecuta el build
npm run lint         # ESLint
npm run format       # aplica Prettier
npm run format:check # verifica formato
npm run typecheck    # TypeScript sin emitir archivos
npm test             # Vitest
npm run check        # format + lint + typecheck + tests + build
```

`npm run check` es el contrato canónico de calidad y es exactamente lo que ejecuta GitHub Actions en pull requests y pushes a `main`.

## Cobertura actual

Los tests del starter verifican al menos:

- payload determinístico de `/health`;
- respuesta 404 estructurada;
- ocultamiento de detalles internos en errores 500;
- defaults de configuración;
- coerción y validación del puerto.

## Estructura

```text
src/
  app.ts       # composición HTTP, rutas base y manejo de errores
  config.ts    # esquema y carga de configuración
  server.ts    # lifecycle, listen y graceful shutdown

test/
  app.test.ts
  config.test.ts

.github/workflows/
  quality.yml
```

La estructura se mantiene chica a propósito. Los módulos de dominio deberían aparecer cuando exista una responsabilidad real, no para completar una arquitectura teórica.

## Qué cambió respecto de la plantilla histórica

La versión anterior heredaba un backend generalista con Express y un conjunto amplio de dependencias para Mongo/Mongoose, Passport, sesiones, mail, uploads, Puppeteer, Socket.io, Handlebars y otras capacidades específicas.

La modernización elimina ese acoplamiento. El starter actual entrega sólo infraestructura transversal y deja que cada producto decida qué módulos incorporar.

## Extensiones recomendadas

Según el proyecto, una evolución puede sumar de forma aislada:

- persistencia SQL o NoSQL;
- autenticación/autorización;
- OpenAPI;
- Docker;
- observabilidad;
- colas/workers;
- rate limiting;
- módulos de dominio.

Ninguna de esas piezas forma parte del baseline hasta que exista una necesidad concreta.

## CI

El workflow permanente usa Ubuntu 24.04, Node.js 22, `npm ci` y `npm run check`. Las Actions de terceros están fijadas por SHA y los permisos del workflow son de sólo lectura.

## Licencia

MIT. Ver `LICENSE`.
