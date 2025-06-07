import { ClienteRepositoryPrisma } from "@/infra/repositories/cliente/cliente.repository.prisma";
import { AtivoRepositoryPrisma } from "@/infra/repositories/ativos/ativo.repository.prisma";
import { prisma } from "@/package/prisma/prisma";
import Fastify from "fastify";
import cors from "@fastify/cors";

// CLIENTES - USE CASES
import { CreateClientUseCase } from "@/usecases/client/create-client/create-client.usecase";
import { ListClientUseCase } from "@/usecases/client/list-client/list-cliente.usecase";
import { DeleteClienteUsecase } from "@/usecases/client/delete-client/delete-cliente.usecase";
import { UpdateClientUseCase } from "@/usecases/client/update-client/update-cliente.usecase";

// CLIENTES - ROUTES
import { CreateClienteRoute } from "@/infra/api/fastify/routes/cliente/create-cliente.fastify.route";
import { ListClienteRoute } from "@/infra/api/fastify/routes/cliente/list-cliente.fastify.route";
import { DeleteClienteRoute } from "@/infra/api/fastify/routes/cliente/delete-cliente.fastify.route";
import { UpdateClienteRoute } from "@/infra/api/fastify/routes/cliente/update-cliente.fastify.route";

// ATIVOS - USE CASES
import { CreateAtivoUseCase } from "@/usecases/ativo/create-ativo/create-ativos.usecase";
import { ListAtivoUseCase } from "@/usecases/ativo/list-ativo/list-ativos.usecase";
import { UpdateAtivoUseCase } from "@/usecases/ativo/update-ativo/update-ativos.usecase";
import { DeleteAtivoUseCase } from "@/usecases/ativo/delete-ativo/delete-ativos.usecase";

// ATIVOS - ROUTES
import { CreateFinancialAssetRoute } from "@/infra/api/fastify/routes/ativo/create-ativo.fastify.route";
import { ListAtivoRoute } from "@/infra/api/fastify/routes/ativo/list-ativo.fastify.route";
import { UpdateAtivoRoute } from "@/infra/api/fastify/routes/ativo/update-ativo.fastify.route";
import { DeleteAtivoRoute } from "@/infra/api/fastify/routes/ativo/delete-ativo.fastify.route";

// FASTIFY API WRAPPER
import { FastifyApi } from "@/infra/api/fastify/api.fastify";

async function server() {
    const clienteRepository = ClienteRepositoryPrisma.create(prisma);
    const ativoRepository = AtivoRepositoryPrisma.create(prisma);

    // CLIENTES - USE CASES
    const createClienteUseCase = CreateClientUseCase.create(clienteRepository, ativoRepository);
    const listClienteUsecase = ListClientUseCase.create(clienteRepository);
    const deleteClienteUsecase = DeleteClienteUsecase.create(clienteRepository);
    const updateClienteUsecase = UpdateClientUseCase.create(clienteRepository);

    // ATIVOS - USE CASES
    const createAtivoUsecase = CreateAtivoUseCase.create(ativoRepository);
    const listAtivoUsecase = ListAtivoUseCase.create(ativoRepository);
    const updateAtivoUsecase = UpdateAtivoUseCase.create(ativoRepository);
    const deleteAtivoUsecase = DeleteAtivoUseCase.create(ativoRepository);

    // CLIENTES - ROUTES
    const createClienteRoute = CreateClienteRoute.create(createClienteUseCase);
    const listClienteRoute = ListClienteRoute.create(listClienteUsecase);
    const deleteClienteRoute = DeleteClienteRoute.create(deleteClienteUsecase);
    const updateClienteRoute = UpdateClienteRoute.create(updateClienteUsecase);

    // ATIVOS - ROUTES
    const createAtivoRoute = CreateFinancialAssetRoute.create(createAtivoUsecase);
    const listAtivoRoute = ListAtivoRoute.create(listAtivoUsecase);
    const updateAtivoRoute = UpdateAtivoRoute.create(updateAtivoUsecase);
    const deleteAtivoRoute = DeleteAtivoRoute.create(deleteAtivoUsecase);

    // FASTIFY INSTANCE (única instância para tudo)
    const app = Fastify({ logger: true });

    // CORS
    await app.register(cors, {
        origin: ["http://localhost:5000", "http://localhost:3000", "https://seu-front-deploy.vercel.app"],
        methods: ["get", "post", "put", "delete", "options"],
    });

    // ROTA TESTE
    app.get("/api/hello", async () => {
        return { message: "Hello from Railway backend!" };
    });

    // REGISTRO DAS ROTAS DA API via wrapper, passando a instância Fastify
    FastifyApi.registerRoutes(app, [
        createClienteRoute,
        listClienteRoute,
        updateClienteRoute,
        deleteClienteRoute,
        createAtivoRoute,
        listAtivoRoute,
        updateAtivoRoute,
        deleteAtivoRoute,
    ]);

    // START SERVER
    const port = Number(process.env.PORT) || 3001;
    await app.listen({ port, host: "0.0.0.0" });
}

// Chamando a função de start do servidor
server().catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
});
