import { check, sleep } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { BASE_URL, HEADERS } from '../helpers/config.js';

/**
 * Spike test — simulates a sudden rush of cashiers logging in,
 * e.g. shift change where 100 employees log in within seconds.
 *
 * Usage: k6 run backend/k6/scripts/spike.js
 */

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '10s', target: 5 }, // Warm-up
    { duration: '10s', target: 100 }, // Spike! Shift change
    { duration: '30s', target: 100 }, // Sustain spike
    { duration: '10s', target: 5 }, // Recovery
    { duration: '20s', target: 5 }, // Verify system recovers
    { duration: '10s', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // More lenient during spikes
    errors: ['rate<0.05'], // Allow up to 5% errors during spike
    http_req_failed: ['rate<0.05'],
  },
};

export function setup() {
  // Pre-register users for login during the spike
  const users = [];
  for (let i = 0; i < 100; i++) {
    const email = `spike-${i}-${Date.now()}@test.com`;
    http.post(
      `${BASE_URL}/auth/register`,
      JSON.stringify({
        email,
        password: 'password123',
        fullName: `Spike User ${i}`,
        role: 'cashier',
      }),
      { headers: HEADERS }
    );
    users.push(email);
  }
  return { users };
}

export default function (data) {
  const userIndex = __VU % data.users.length;
  const email = data.users[userIndex];

  const res = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email, password: 'password123' }),
    { headers: HEADERS }
  );

  const success = check(res, {
    'login successful': (r) => r.status === 200,
    'response time < 1s': (r) => r.timings.duration < 1000,
  });

  errorRate.add(!success);
  sleep(0.5);
}
