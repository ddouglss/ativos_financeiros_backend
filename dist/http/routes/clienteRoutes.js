"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteRoutes = clienteRoutes;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function clienteRoutes(app) {
    // Listar
    app.get("/clientes", async () => {
        return await prisma.cliente.findMany();
    });
    // Criar
    app.post("/clientes", async (request, reply) => {
        const bodySchema = zod_1.z.object({
            nome: zod_1.z.string(),
            email: zod_1.z.string().email(),
            status: zod_1.z.boolean(),
        });
        const { nome, email, status } = bodySchema.parse(request.body);
        const cliente = await prisma.cliente.create({
            data: { nome, email, status },
        });
        return reply.status(201).send(cliente);
    });
    app.put("/clientes/:id", async (request, reply) => {
        const paramSchema = zod_1.z.object({ id: zod_1.z.string() });
        const bodySchema = zod_1.z.object({
            nome: zod_1.z.string(),
            email: zod_1.z.string().email(),
            status: zod_1.z.boolean(),
        });
        const { id } = paramSchema.parse(request.params);
        const data = bodySchema.parse(request.body);
        const cliente = await prisma.cliente.update({
            where: { id },
            data,
        });
        return reply.send(cliente);
    });
}
