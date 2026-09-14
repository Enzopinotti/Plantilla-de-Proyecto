import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

const apps: ReturnType<typeof buildApp>[] = [];

function createTestApp() {
  const app = buildApp(
    loadConfig({
      NODE_ENV: "test",
      HOST: "127.0.0.1",
      PORT: "3000",
      LOG_LEVEL: "silent",
    }),
  );
  apps.push(app);
  return app;
}

afterEach(async () => {
  await Promise.all(apps.splice(0).map((app) => app.close()));
});

describe("HTTP contracts", () => {
  it("returns a deterministic health payload", async () => {
    const app = createTestApp();
    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: "ok",
      service: "node-service-starter",
      environment: "test",
    });
  });

  it("returns a structured 404 response", async () => {
    const app = createTestApp();
    const response = await app.inject({ method: "GET", url: "/missing" });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({
      error: {
        code: "NOT_FOUND",
        message: "Route GET /missing not found",
      },
    });
  });

  it("hides unexpected internal error messages", async () => {
    const app = createTestApp();
    app.get("/boom", async () => {
      throw new Error("sensitive internal detail");
    });

    const response = await app.inject({ method: "GET", url: "/boom" });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({
      error: {
        code: "INTERNAL_ERROR",
        message: "Internal Server Error",
      },
    });
  });
});
