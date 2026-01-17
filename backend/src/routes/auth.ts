import { Elysia, t } from 'elysia'
import { userQueries } from '../db/queries/users'

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post(
    '/register',
    async ({ body, set }) => {
      // Check if user exists
        const {email, password, fullName,role} = body as{
            email: string,
            password: string,
            role?: string
            fullName: string
        }
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
      body: t.Object({
        email: t.String(),
        password: t.String({ minLength: 6 }),
        fullName: t.String(),
        role: t.Optional(t.String()),
      }),
    }
  )
  .post(
    '/login',
    async ({ body, set }) => {
        const {email,password} = body as {
            email: string,
            password: string
        }
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
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
