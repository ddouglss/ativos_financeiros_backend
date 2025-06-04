"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_repository_prisma_1 = require("@/infra/repositories/cliente/cliente.repository.prisma");
const prisma_1 = require("@/package/prisma/prisma");
const create_client_usecase_1 = require("@/usecases/client/create-client/create-client.usecase");
const create_cliente_fastify_route_1 = require("@/infra/api/fastify/routes/cliente/create-cliente.fastify.route");
const list_cliente_usecase_1 = require("@/usecases/client/list-client/list-cliente.usecase");
const list_cliente_fastify_route_1 = require("@/infra/api/fastify/routes/cliente/list-cliente.fastify.route");
const delete_cliente_usecase_1 = require("@/usecases/client/delete-client/delete-cliente.usecase");
const delete_cliente_fastify_route_1 = require("@/infra/api/fastify/routes/cliente/delete-cliente.fastify.route");
const update_cliente_usecase_1 = require("@/usecases/client/update-client/update-cliente.usecase");
const update_cliente_fastify_route_1 = require("@/infra/api/fastify/routes/cliente/update-cliente.fastify.route");
const list_ativos_usecase_1 = require("@/usecases/ativo/create-ativo/list-ativos.usecase");
const create_ativo_fastify_route_1 = require("@/infra/api/fastify/routes/ativo/create-ativo.fastify.route");
const api_fastify_1 = require("@/infra/api/fastify/api.fastify");
function server() {
    // Instancia do repositório (acesso ao banco via Prisma)
    const clienteRepository = cliente_repository_prisma_1.ClienteRepositoryPrisma.create(prisma_1.prisma);
    const ativossRepository = cliente_repository_prisma_1.ClienteRepositoryPrisma.create(prisma_1.prisma);
    // Instanciando usecases
    const createClienteUsecase = create_client_usecase_1.CreateClientUseCase.create(clienteRepository);
    const listClienteUsecase = list_cliente_usecase_1.ListClientUseCase.create(clienteRepository);
    const deleteClienteUsecase = delete_cliente_usecase_1.DeleteClienteUsecase.create(clienteRepository);
    const updateClienteUsecase = update_cliente_usecase_1.UpdateClientUseCase.create(clienteRepository);
    const listAtivosUsecase = list_ativos_usecase_1.ListFinancialAssetsUseCase.create(ativossRepository);
    const createRoute = create_cliente_fastify_route_1.CreateClienteRoute.create(createClienteUsecase);
    const listRoute = list_cliente_fastify_route_1.ListClienteRoute.create(listClienteUsecase);
    const deleteRoute = delete_cliente_fastify_route_1.DeleteClienteRoute.create(deleteClienteUsecase);
    const updateRoute = update_cliente_fastify_route_1.UpdateClienteRoute.create(updateClienteUsecase);
    const listAtivosRoute = create_ativo_fastify_route_1.ListFinancialAssetsRoute.create(listAtivosUsecase);
    const port = 3000;
    const api = api_fastify_1.FastifyApi.create([createRoute, listRoute, deleteRoute, updateRoute, listAtivosRoute]);
    api.start(port);
}
server();
