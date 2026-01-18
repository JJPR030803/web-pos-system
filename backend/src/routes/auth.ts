import { Elysia, t } from 'elysia'
import { userQueries } from '../db/queries/users'
import {registerSchema,RegisterBody,LoginBody,loginSchema} from "../schemas/auth";

/**
 * Authentication routes
 * Handles user registration and login
 * @module routes/auth
 */
export const authRoutes = new Elysia({ prefix: '/auth' })
    /**
     * POST /auth/register
     * Register a new user account
     */
    .post(
    '/register',
    async ({ body, set }) => {
      // Check if user exists
        const {email, password, fullName,role} = body as RegisterBody;


      const existing = await userQueries.findByEmail(email)
      if (existing) {
        set.status = 400
        return { error: 'User already exists' }
      }

      // Create user (map password -> passwordHash)
      const user = await userQueries.create({
        email,
          passwordHash:password,
          fullName,
          role
      })

      // Return user without password
      const { passwordHash, ...safeUser } = user
      return { user: safeUser }
    },
    {
      body: registerSchema,
        detail:{
          summary: 'Register a new user',
            description: 'Creates a new user with provided credentials',
            tags: ['auth'],
        },
    }
  )
    /**
     * POST /auth/login
     * Authenticate user credentials
     */
  .post(
    '/login',
    async ({ body, set }) => {
        const {email,password} = body as LoginBody;

      const user = await userQueries.findByEmail(email)

      if (!user || user.passwordHash !== password) {
        set.status = 401
        return { error: 'Invalid credentials' }
      }

      if (!user.isActive) {
        set.status = 403
        return { error: 'Account is deactivated' }
      }

      const { passwordHash, ...safeUser } = user
      return {
        user: safeUser,
        token: 'temporary-token',
      }
    },
    {
      body: loginSchema,
        detail:{
            summary: 'Authenticate user',
            description: 'Validates user credentials and returns auth token',
            tags: ['auth'],
        }
    }
  )
