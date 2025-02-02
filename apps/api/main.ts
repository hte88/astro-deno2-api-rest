import { Application } from 'https://deno.land/x/oak@v12.4.0/mod.ts'
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts'
import { errorHandler } from './src/middlewares/errorHandler.ts'
import { noRouteFound } from './src/middlewares/notFound.ts'
import { router } from './src/routes/authRoutes.ts'

const app = new Application()

app.use(oakCors())
app.use(noRouteFound)
app.use(errorHandler)
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })
