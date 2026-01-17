import {eq} from 'drizzle-orm'
import {db} from '../index'
import {users} from '../schema'

export const userQueries = {
    async create(data:{
        email: string
        passwordHash: string
        fullName: string
        role?: string
    }){
        const [user] = await db.insert(users).values(data).returning()
        return user
    },
    async findByEmail(email: string){
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email,email))
        return user
    },
    async findById(id: number){
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id,id))
        return user
    },
    async findAll(){
        return db.select().from(users)
    },

    async update(id:number,data: Partial<typeof users.$inferInsert>){
        const [user] = await db
            .update(users)
            .set(data)
            .where(eq(users.id,id))
            .returning()
        return user
    },

    // Delete user (soft delete set isActive to false)
    async deactivate(id:number){
        return await this.update(id,{isActive:false})
    },

}