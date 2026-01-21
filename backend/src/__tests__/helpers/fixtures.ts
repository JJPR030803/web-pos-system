// backend/tests/helpers/fixtures.ts
import { db } from '../../db'
import { users } from '../../db/schema'
import type {NewUser,User} from "@pos/shared";

export const testUsers = {
    valid: {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        role: 'cashier' as const,
        isActive: true,
    },
    admin: {
        email: 'admin@example.com',
        password: 'admin123',
        fullName: 'Admin User',
        role: 'admin' as const,
        isActive: true,
    }
}

export async function cleanDatabase() {
    await db.delete(users)
}

export async function createTestUser(
    overrides: Partial<Omit<NewUser, 'id'>> = {},
): Promise<User> {
    const [user] = await db
        .insert(users)
        .values({
            email: testUsers.valid.email,
            passwordHash: testUsers.valid.password,
            fullName: testUsers.valid.fullName,
            role: testUsers.valid.role,
            isActive: testUsers.valid.isActive,
            ...overrides,
        })
        .returning()
    return user
}

export async function createMultipleUsers(count: number): Promise<User[]> {
    const userPromises = Array.from({length:count},(_,i)=>
    createTestUser({
        email: `user${i}@example.com`,
        fullName: `User ${i}`,
    })
    )
    return Promise.all(userPromises)
}