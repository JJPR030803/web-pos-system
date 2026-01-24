import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { users } from '../../../backend/src/db/schema';

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type SafeUser = Omit<User, 'passwordHash'>;

export type RegisterResponse = {
  user: SafeUser;
};

export type LoginResponse = {
  user: SafeUser;
  token: string;
};

export type ErrorResponse = {
  error: string;
};
