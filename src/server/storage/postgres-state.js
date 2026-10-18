'use strict';

const { Pool } = require('pg');

const KEY_PATTERN = /^[a-z0-9:_-]{1,160}$/i;

function createPostgresStateStore(options = {}) {
  const source = options.databaseUrl ?? process.env.DATABASE_URL;
  if (typeof source !== 'string' || !source.trim()) return null;
  const url = new URL(source.trim());
  if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname || !url.username) {
    throw new Error('DATABASE_URL must be a PostgreSQL connection string');
  }
  if (!['localhost', '127.0.0.1', '::1'].includes(url.hostname) && !url.searchParams.has('sslmode')) {
    url.searchParams.set('sslmode', 'require');
  }
  const pool = new Pool({
    connectionString: url.toString(),
    max: Number(options.maxConnections || process.env.OMS_DATABASE_POOL_SIZE || 3),
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    allowExitOnIdle: true
  });
  pool.on('error', () => {});
  let ready;

  function key(value) {
    const normalized = String(value || '');
    if (!KEY_PATTERN.test(normalized)) throw new Error('Invalid state key');
    return normalized;
  }

  function initialize() {
    if (!ready) ready = pool.query(`
      CREATE TABLE IF NOT EXISTS oms_state (
        state_key VARCHAR(160) PRIMARY KEY,
        state_value JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    return ready;
  }

  async function load(stateKey, fallback = null) {
    await initialize();
    const result = await pool.query('SELECT state_value FROM oms_state WHERE state_key = $1', [key(stateKey)]);
    return result.rowCount ? result.rows[0].state_value : fallback;
  }

  async function save(stateKey, value) {
    await initialize();
    await pool.query(`
      INSERT INTO oms_state (state_key, state_value, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (state_key) DO UPDATE
      SET state_value = EXCLUDED.state_value, updated_at = NOW()
    `, [key(stateKey), JSON.stringify(value)]);
  }

  async function close() {
    await pool.end();
  }

  return { kind: 'postgres', initialize, load, save, close };
}

module.exports = { createPostgresStateStore };
