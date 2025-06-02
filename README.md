domain/: Regras de negócio puras.

usecases/: Casos de uso da aplicação (interação entre entidades e repositórios).

infra/: Implementações reais (banco de dados, Prisma, etc.).

http/: Entrada e saída da aplicação (Fastify, controladores, rotas).

validators/: Esquemas de validação usando zod.

middlewares/: Tratadores de erro, autenticação etc.

env.ts: Carrega e valida variáveis de ambiente.

app.ts: Criação da instância Fastify.

main.ts: Inicializa e sobe o servidor.