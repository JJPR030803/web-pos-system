import { check, sleep } from 'k6';
import http from 'k6/http';
import { Rate, Trend } from 'k6/metrics';
import { BASE_URL, HEADERS, uniqueEmail } from '../helpers/config.js';

/**
 * Soak test — sustained moderate load over an extended period.
 * Detects memory leaks, connection pool exhaustion, and
 * performance degradation in Bun/ElysiaJS over time.
 *
 * Usage: k6 run backend/k6/scripts/soak.js
 * Note: This test runs for 10 minutes. Use --duration to override.
 */

const errorRate = new Rate('errors');
const p95Trend = new Trend('p95_over_time', true);

export const options = {
  stages: [
    { duration: '1m', target: 30 }, // Ramp up
    { duration: '8m', target: 30 }, // Sustained load
    { duration: '1m', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    errors: ['rate<0.01'],
    http_req_failed: ['rate<0.01'],
  },
};

export function setup() {
  const email = `soak-shared-${Date.now()}@test.com`;
  http.post(
    `${BASE_URL}/auth/register`,
    JSON.stringify({
      email,
      password: 'password123',
      fullName: 'Soak Test User',
      role: 'cashier',
    }),
    { headers: HEADERS }
  );
  return { sharedEmail: email };
}

export default function (data) {
  // Simulate realistic POS usage pattern
  // Health check (monitoring)
  const healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, {
    'health ok': (r) => r.status === 200,
  });

  // Login (most common operation)
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: data.sharedEmail, password: 'password123' }),
    { headers: HEADERS }
  );
  const loginOk = check(loginRes, {
    'login ok': (r) => r.status === 200,
  });
  errorRate.add(!loginOk);
  p95Trend.add(loginRes.timings.duration);

  // Occasional registration (less frequent)
  if (Math.random() < 0.1) {
    const regRes = http.post(
      `${BASE_URL}/auth/register`,
      JSON.stringify({
        email: uniqueEmail('soak'),
        password: 'password123',
        fullName: 'Soak New User',
        role: 'cashier',
      }),
      { headers: HEADERS }
    );
    check(regRes, {
      'register ok': (r) => r.status === 200,
    });
  }

  sleep(2);
}
