import { Context } from 'https://deno.land/x/oak/mod.ts'
import type { UserAuth } from '@/models/authModel'

const user: UserAuth = { email: 'olivier@gmail.com', password: '123456789' }

export const authLogin = async (ctx: Context) => {
  try {
    const { email, password } = await ctx.request.body().value

    if (!user || !user.password) {
      ctx.response.status = 401
      ctx.response.body = { error: 'Invalid username or password' }
      return
    }
    ctx.response.status = 200
    ctx.response.body = { message: 'Login successful' }
  } catch (error) {
    console.error('Error during login:', error)
    ctx.response.status = 400
    ctx.response.body = { error: 'Invalid request' }
  }
}
