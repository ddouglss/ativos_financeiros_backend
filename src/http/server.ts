import Fastify from 'fastify'
import cors from '@fastify/cors'
import { clienteRoutes } from './routes/cliente'

const app = Fastify()

// Habilita CORS
app.register(cors, {
    origin: '*',
})

// Registra as rotas de clientes (organizado por módulo)
app.register(clienteRoutes, { prefix: '/clientes' })

// Rota básica de teste
app.get('/', () => {
    return { message: 'Servidor OK 🚀' }
})

// Sobe o servidor
app.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    console.log(`🚀 Servidor rodando em: ${address}`)
})
