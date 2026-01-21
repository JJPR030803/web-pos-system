import {describe,it,beforeEach,afterAll,expect} from "bun:test"
import {treaty} from "@elysiajs/eden";
import type {App} from "../../index"
import {createTestUser,cleanDatabase,testUsers} from "../helpers/fixtures";
import {User,SafeUser,RegisterResponse,LoginResponse,ErrorResponse,NewUser} from '@pos/shared'


const api = treaty<App>("http://localhost:3000")

describe("Auth routes", () => {
    beforeEach(async () => {
        await cleanDatabase()
    })


describe('POST /auth/register', () => {
    it('should register a new user succesfully', async () => {

        const {data,error} = await api.auth.register.post(testUsers.valid)

        expect(error).toBeNull()
        expect(data).toBeDefined()

        const response = data as RegisterResponse

        expect(response.user.email).toBe(testUsers.valid.email)
        expect(response.user.fullName).toBe(testUsers.valid.fullName)
        expect(response.user.role).toBe(testUsers.valid.role)

    })

    it('should reject duplicate email', async () => {
        await createTestUser()
        const {error} = await api.auth.register.post(testUsers.valid)

        expect(error).toBeDefined()
        expect(error?.status).toBe(400)

        const errorResponse = error?.value as ErrorResponse
        expect(errorResponse.error).toBe('User already exists')

    });
    it('should validate email format', async () => {
        const {error} = await api.auth.register.post(
            {
                ...testUsers.valid,
                email: 'invalid-email'
            }
        )
        expect(error).toBeDefined()
        expect(error?.status).toBe(422)

        if (error?.value && typeof error?.value === 'object') {
            const errorResponse = error.value as {error:string;details?:string}
            expect(errorResponse.error).toBe('Validation failed')
        }
    });


    it('should require minimum pasword length', async () => {
        const {error} = await api.auth.register.post({
            ...testUsers.valid,
            password: 'shrt'
        })
        expect(error).toBeDefined()
        expect(error?.status).toBe(422)

        if (error?.value && typeof error.value === 'object') {
            const errorResponse = error.value as { error: string; details?: string }
            expect(errorResponse.error).toBe('Validation failed')
        }
    });

    it('should validate role enum', async () => {
        const {error} = await api.auth.register.post({
            ...testUsers.valid,
            role: 'invalid-role' as any
        })
        expect(error?.status).toBe(422)
    });
})

describe('POST /auth/login', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    it('should login with valid credentials',async () => {
        const {data,error} = await api.auth.login.post({
            email: testUsers.valid.email,
            password: testUsers.valid.password,
        })

        expect(error).toBeNull()

        const response = data as LoginResponse

        expect(response.user.email).toBe(testUsers.valid.email)
        expect(response.user.fullName).toBe(testUsers.valid.fullName)
        expect(response.token).toBe('temporary-token')
    });

    it('should reject invalid credentials', async () => {
        const {error} = await api.auth.login.post({
            email: testUsers.valid.email,
            password: 'wrong-password',
        })

        expect(error).toBeDefined()
        expect(error?.status).toBe(401)

        const errorResponse = error?.value as ErrorResponse
        expect(errorResponse.error).toBe('Invalid credentials')
    });

    it('should reject deactivated account', async () => {
        await cleanDatabase()
        await createTestUser({
            email: 'inactive@example.com',
            passwordHash: 'password123',
            fullName: 'Uicds',
            role: 'cashier',
            isActive: false
        })
        const {error} = await api.auth.login.post({
            email: 'inactive@example.com',
            password: 'password123'
        })
        expect(error).toBeDefined()
        expect(error?.status).toBe(403)
        const errorResponse = error?.value as ErrorResponse
        expect(errorResponse.error).toBe('Account is deactivated')
    });
})
})