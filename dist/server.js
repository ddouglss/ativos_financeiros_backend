"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_repository_prisma_1 = require("@/infra/repositories/cliente/cliente.repository.prisma");
const ativo_repository_prisma_1 = require("@/infra/repositories/ativos/ativo.repository.prisma");
const prisma_1 = require("@/package/prisma/prisma");
// CLIENTES - USE CASES
const create_client_usecase_1 = require("@/usecases/client/create-client/create-client.usecase");
const list_cliente_usecase_1 = require("@/usecases/client/list-client/list-cliente.usecase");
const delete_cliente_usecase_1 = require("@/usecases/client/delete-client/delete-cliente.usecase");
const update_cliente_usecase_1 = require("@/usecases/client/update-client/update-cliente.usecase");
// CLIENTES - ROUTES
const create_cliente_fastify_route_1 = require("@/infra/api/fastify/routes/cliente/create-cliente.fastify.route");
const list_cliente_fastify_route_1 = require("@/infra/api/fastify/routes/cliente/list-cliente.fastify.route");
const delete_cliente_fastify_route_1 = require("@/infra/api/fastify/routes/cliente/delete-cliente.fastify.route");
const update_cliente_fastify_route_1 = require("@/infra/api/fastify/routes/cliente/update-cliente.fastify.route");
// ATIVOS - USE CASES
const create_ativos_usecase_1 = require("@/usecases/ativo/create-ativo/create-ativos.usecase");
const list_ativos_usecase_1 = require("@/usecases/ativo/list-ativo/list-ativos.usecase");
const update_ativos_usecase_1 = require("@/usecases/ativo/update-ativo/update-ativos.usecase");
const delete_ativos_usecase_1 = require("@/usecases/ativo/delete-ativo/delete-ativos.usecase");
// ATIVOS - ROUTES
const create_ativo_fastify_route_1 = require("@/infra/api/fastify/routes/ativo/create-ativo.fastify.route");
const list_ativo_fastify_route_1 = require("@/infra/api/fastify/routes/ativo/list-ativo.fastify.route");
const update_ativo_fastify_route_1 = require("@/infra/api/fastify/routes/ativo/update-ativo.fastify.route");
const delete_ativo_fastify_route_1 = require("@/infra/api/fastify/routes/ativo/delete-ativo.fastify.route");
// FASTIFY API WRAPPER
const api_fastify_1 = require("@/infra/api/fastify/api.fastify");
function server() {
    const clienteRepository = cliente_repository_prisma_1.ClienteRepositoryPrisma.create(prisma_1.prisma);
    const ativoRepository = ativo_repository_prisma_1.AtivoRepositoryPrisma.create(prisma_1.prisma);
    // CLIENTES - USE CASES
    const createClienteUseCase = create_client_usecase_1.CreateClientUseCase.create(clienteRepository, ativoRepository);
    const listClienteUsecase = list_cliente_usecase_1.ListClientUseCase.create(clienteRepository);
    const deleteClienteUsecase = delete_cliente_usecase_1.DeleteClienteUsecase.create(clienteRepository);
    const updateClienteUsecase = update_cliente_usecase_1.UpdateClientUseCase.create(clienteRepository);
    // ATIVOS - USE CASES
    const createAtivoUsecase = create_ativos_usecase_1.CreateAtivoUseCase.create(ativoRepository);
    const listAtivoUsecase = list_ativos_usecase_1.ListAtivoUseCase.create(ativoRepository);
    const updateAtivoUsecase = update_ativos_usecase_1.UpdateAtivoUseCase.create(ativoRepository);
    const deleteAtivoUsecase = delete_ativos_usecase_1.DeleteAtivoUseCase.create(ativoRepository);
    // CLIENTES - ROUTES
    const createClienteRoute = create_cliente_fastify_route_1.CreateClienteRoute.create(createClienteUseCase);
    const listClienteRoute = list_cliente_fastify_route_1.ListClienteRoute.create(listClienteUsecase);
    const deleteClienteRoute = delete_cliente_fastify_route_1.DeleteClienteRoute.create(deleteClienteUsecase);
    const updateClienteRoute = update_cliente_fastify_route_1.UpdateClienteRoute.create(updateClienteUsecase);
    // ATIVOS - ROUTES
    const createAtivoRoute = create_ativo_fastify_route_1.CreateFinancialAssetRoute.create(createAtivoUsecase);
    const listAtivoRoute = list_ativo_fastify_route_1.ListAtivoRoute.create(listAtivoUsecase);
    const updateAtivoRoute = update_ativo_fastify_route_1.UpdateAtivoRoute.create(updateAtivoUsecase);
    const deleteAtivoRoute = delete_ativo_fastify_route_1.DeleteAtivoRoute.create(deleteAtivoUsecase);
    // Inicialização da API
    const port = 3000;
    const api = api_fastify_1.FastifyApi.create([
        // CLIENTES
        createClienteRoute,
        listClienteRoute,
        updateClienteRoute,
        deleteClienteRoute,
        // ATIVOS
        createAtivoRoute,
        listAtivoRoute,
        updateAtivoRoute,
        deleteAtivoRoute,
    ]);
    api.start(port);
}
server();
