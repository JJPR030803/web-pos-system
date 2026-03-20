// Shared k6 configuration and helpers

export const BASE_URL = __ENV.BASE_URL || 'http://host.docker.internal:3000';

export const HEADERS = {
  'Content-Type': 'application/json',
};

// Reusable test user credentials
export const TEST_USERS = {
  valid: {
    email: 'k6-test@example.com',
    password: 'password123',
    fullName: 'K6 Test User',
    role: 'cashier',
  },
  admin: {
    email: 'k6-admin@example.com',
    password: 'admin123',
    fullName: 'K6 Admin User',
    role: 'admin',
  },
};

// Common thresholds for POS system requirements
export const DEFAULT_THRESHOLDS = {
  http_req_duration: ['p(95)<500', 'p(99)<1000'],
  http_req_failed: ['rate<0.01'],
};

// Stricter thresholds for critical POS operations
export const STRICT_THRESHOLDS = {
  http_req_duration: ['p(95)<200', 'p(99)<500'],
  http_req_failed: ['rate<0.005'],
};

// Generate a unique email for each VU iteration
export function uniqueEmail(prefix = 'k6') {
  return `${prefix}-${__VU}-${__ITER}-${Date.now()}@test.com`;
}
