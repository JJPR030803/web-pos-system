import { check, sleep } from 'k6';
import http from 'k6/http';
import { BASE_URL, HEADERS, STRICT_THRESHOLDS } from '../helpers/config.js';

/**
 * Smoke test — minimal load to verify the API is functional.
 * Run this before heavier tests to catch obvious failures early.
 *
 * Usage: k6 run backend/k6/scripts/smoke.js
 */
export const options = {
  vus: 1,
  duration: '10s',
  thresholds: STRICT_THRESHOLDS,
};

export default function () {
  // Health check
  const healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, {
    'GET /health returns 200': (r) => r.status === 200,
    'GET /health returns ok status': (r) => r.json('status') === 'ok',
  });

  // Root endpoint
  const rootRes = http.get(`${BASE_URL}/`);
  check(rootRes, {
    'GET / returns 200': (r) => r.status === 200,
    'GET / returns POS API message': (r) => r.json('message') === 'POS API',
  });

  // Register a new user
  const email = `smoke-${__VU}-${__ITER}-${Date.now()}@test.com`;
  const registerRes = http.post(
    `${BASE_URL}/auth/register`,
    JSON.stringify({
      email,
      password: 'password123',
      fullName: 'Smoke Test User',
      role: 'cashier',
    }),
    { headers: HEADERS }
  );
  check(registerRes, {
    'POST /auth/register returns 200': (r) => r.status === 200,
    'register returns user object': (r) => r.json('user') !== undefined,
  });

  // Login with the registered user
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email, password: 'password123' }),
    { headers: HEADERS }
  );
  check(loginRes, {
    'POST /auth/login returns 200': (r) => r.status === 200,
    'login returns token': (r) => r.json('token') !== undefined,
    'login returns user': (r) => r.json('user') !== undefined,
  });

  sleep(1);
}
