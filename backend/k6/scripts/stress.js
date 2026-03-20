import { check, sleep } from 'k6';
import http from 'k6/http';
import { Rate, Trend } from 'k6/metrics';
import { BASE_URL, HEADERS, uniqueEmail } from '../helpers/config.js';

/**
 * Stress test — pushes the API beyond normal capacity to find
 * the breaking point. Useful for capacity planning.
 *
 * Usage: k6 run backend/k6/scripts/stress.js
 */

const errorRate = new Rate('errors');
const responseTrend = new Trend('response_time', true);

export const options = {
  stages: [
    { duration: '30s', target: 50 }, // Below normal load
    { duration: '30s', target: 100 }, // Normal load
    { duration: '30s', target: 200 }, // Beyond normal
    { duration: '30s', target: 300 }, // Breaking point?
    { duration: '30s', target: 400 }, // Well beyond capacity
    { duration: '1m', target: 0 }, // Recovery
  ],
  thresholds: {
    errors: ['rate<0.30'], // Expect some failures under extreme load
    http_req_duration: ['p(50)<500'], // Median should stay reasonable
  },
};

export function setup() {
  const email = `stress-shared-${Date.now()}@test.com`;
  http.post(
    `${BASE_URL}/auth/register`,
    JSON.stringify({
      email,
      password: 'password123',
      fullName: 'Stress Test User',
      role: 'cashier',
    }),
    { headers: HEADERS }
  );
  return { sharedEmail: email };
}

export default function (data) {
  // Mix of operations: 70% login, 30% register
  const isLogin = Math.random() < 0.7;

  let res;
  if (isLogin) {
    res = http.post(
      `${BASE_URL}/auth/login`,
      JSON.stringify({ email: data.sharedEmail, password: 'password123' }),
      { headers: HEADERS }
    );
    const ok = check(res, {
      'login returns 200': (r) => r.status === 200,
    });
    errorRate.add(!ok);
  } else {
    res = http.post(
      `${BASE_URL}/auth/register`,
      JSON.stringify({
        email: uniqueEmail('stress'),
        password: 'password123',
        fullName: 'Stress User',
        role: 'cashier',
      }),
      { headers: HEADERS }
    );
    const ok = check(res, {
      'register returns 200': (r) => r.status === 200,
    });
    errorRate.add(!ok);
  }

  responseTrend.add(res.timings.duration);
  sleep(0.3);
}
