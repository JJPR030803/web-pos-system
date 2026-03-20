import { check, group, sleep } from 'k6';
import http from 'k6/http';
import { Counter, Rate, Trend } from 'k6/metrics';
import { BASE_URL, DEFAULT_THRESHOLDS, HEADERS, uniqueEmail } from '../helpers/config.js';

/**
 * Load test — simulates typical POS usage during business hours.
 * Ramps up to 50 concurrent cashiers performing auth operations.
 *
 * Usage: k6 run backend/k6/scripts/load-auth.js
 */

// Custom metrics
const loginDuration = new Trend('login_duration', true);
const registerDuration = new Trend('register_duration', true);
const loginFailRate = new Rate('login_failures');
const successfulLogins = new Counter('successful_logins');

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up — opening shift
    { duration: '1m', target: 50 }, // Sustained load — peak hours
    { duration: '30s', target: 50 }, // Hold peak
    { duration: '30s', target: 0 }, // Ramp down — closing
  ],
  thresholds: {
    ...DEFAULT_THRESHOLDS,
    login_duration: ['p(95)<300'],
    register_duration: ['p(95)<500'],
    login_failures: ['rate<0.01'],
  },
};

export function setup() {
  // Register a shared user that all VUs will use for login tests
  const email = `load-shared-${Date.now()}@test.com`;
  const res = http.post(
    `${BASE_URL}/auth/register`,
    JSON.stringify({
      email,
      password: 'password123',
      fullName: 'Shared Load User',
      role: 'cashier',
    }),
    { headers: HEADERS }
  );

  if (res.status !== 200) {
    console.error(`Setup failed: could not register shared user (${res.status})`);
  }

  return { sharedEmail: email };
}

export default function (data) {
  group('Login flow', () => {
    const loginRes = http.post(
      `${BASE_URL}/auth/login`,
      JSON.stringify({ email: data.sharedEmail, password: 'password123' }),
      { headers: HEADERS }
    );

    const loginOk = check(loginRes, {
      'login returns 200': (r) => r.status === 200,
      'login has token': (r) => r.json('token') !== undefined,
    });

    loginDuration.add(loginRes.timings.duration);
    loginFailRate.add(!loginOk);
    if (loginOk) successfulLogins.add(1);
  });

  group('Registration flow', () => {
    const email = uniqueEmail('load');
    const registerRes = http.post(
      `${BASE_URL}/auth/register`,
      JSON.stringify({
        email,
        password: 'password123',
        fullName: 'Load Test User',
        role: 'cashier',
      }),
      { headers: HEADERS }
    );

    check(registerRes, {
      'register returns 200': (r) => r.status === 200,
      'register returns user': (r) => r.json('user') !== undefined,
    });

    registerDuration.add(registerRes.timings.duration);
  });

  sleep(1);
}
