import { Context } from 'https://deno.land/x/oak/mod.ts'
import type { UserAuth } from 'apps/front/src/models/authModel.ts'
import { AuthService } from '../services/authService.ts'

const user: UserAuth = { email: 'olivier@gmail.com', password: '123456789' }

export const authRegister = async (ctx: Context) => {
  try {
    const { email, password } = await ctx.request.body().value
    const existingUser = await AuthService.register(email, password)

    if (existingUser) {
      ctx.response.status = 401
      ctx.response.body = { error: 'User already exists' }
      return
    }
    ctx.response.status = 201
    ctx.response.body = { message: 'User created successfully' }
  } catch (err) {
    ctx.response.status = 400
    ctx.response.body = { message: err.message }
  }
}

export const authLogin = async (ctx: Context) => {
  try {
    const { email, password } = await ctx.request.body().value
    const user  = await AuthService.login(email, password)

    if (!user) {
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
