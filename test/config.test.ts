import { describe, expect, it } from 'vitest';

import { loadConfig } from '../src/config.js';

describe('loadConfig', () => {
  it('provides safe local defaults', () => {
    const config = loadConfig({});

    expect(config).toEqual({
      NODE_ENV: 'development',
      HOST: '0.0.0.0',
      PORT: 3000,
      LOG_LEVEL: 'info',
    });
  });

  it('coerces a valid port and rejects an invalid one', () => {
    expect(loadConfig({ PORT: '4100' }).PORT).toBe(4100);
    expect(() => loadConfig({ PORT: '70000' })).toThrow();
  });
});
