import { Router } from 'https://deno.land/x/oak/mod.ts'
import { authLogin } from '../controllers/authController.ts'

const router = new Router()

router.post('/api/register', authLogin).post('/api/login', authLogin)

export { router }
