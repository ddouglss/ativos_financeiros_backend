import Fastify from 'fastify'

const app = Fastify()

app.get('/', () => {
    return 'servidor ok'
})

app.listen({port: 3333}).then(() => console.log(`Reodando na 