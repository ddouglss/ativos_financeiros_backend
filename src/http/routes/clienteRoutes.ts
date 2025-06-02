import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function clienteRoutes(app: FastifyInstance) {
    // Listar
    app.get("/clientes", async () => {
        return await prisma.cliente.findMany();
    });

    // Criar
    app.post("/clientes", async (request, reply) => {
        const bodySchema = z.object({
            nome: z.string(),
            email: z.string().email(),
            status: z.boolean(),
        });

        const { nome, email, status } = bodySchema.parse(request.body);

        const cliente = await prisma.cliente.create({
            data: { nome, email, status },
        });

        return reply.status(201).send(cliente);
    });

    // Atualizar
    app.put("/clientes/:id", async (request, reply) => {
        const paramSchema = z.object({ id: z.string() });
        const bodySchema = z.object({
            nome: z.string(),
            email: z.string().email(),
            status: z.boolean(),
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
