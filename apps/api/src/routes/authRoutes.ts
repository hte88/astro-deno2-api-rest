import { Router } from 'https://deno.land/x/oak/mod.ts'
import { authRegister, authLogin } from '../controllers/authController.ts'

const router = new Router()

router.post('/api/register', authRegister).post('/api/login', authLogin)

export { router }
