import { t } from 'elysia';

/**
 * User registration request schema
 */

export const registerSchema = t.Object({
  email: t.String({
    format: 'email',
    error: 'Invalid email format',
  }),
  password: t.String({
    minLength: 6,
    error: 'Password must be at least 6 characters',
  }),
  fullName: t.String({
    minLength: 2,
    error: 'Field is required',
  }),
  role: t.Optional(t.Union([t.Literal('admin'), t.Literal('manager'), t.Literal('cashier')])),
});

/**
 * User login request schema
 */

export const loginSchema = t.Object({
  email: t.String(),
  password: t.String(),
});

export type RegisterBody = typeof registerSchema.static;
export type LoginBody = typeof loginSchema.static;
