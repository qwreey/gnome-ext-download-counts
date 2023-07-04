import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastify from "fastify"
import { configDotenv } from "dotenv"

import jsonapi from "./jsonapi"
// import repocard from "./repocard"
import api from "./api"

configDotenv()

const instance = fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>()

instance.decorate('api', new api())
// instance.register(repocard)
instance.register(jsonapi)

declare module 'fastify' {
    interface FastifyInstance {
        api: api
    }
}
export type instance = typeof instance

instance.listen({
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || 'localhost',
})
