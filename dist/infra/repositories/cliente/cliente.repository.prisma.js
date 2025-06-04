"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepositoryPrisma = void 0;
const Client_1 = require("@/domain/clientes/entities/Client");
class ClienteRepositoryPrisma {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static create(prismaClient) {
        return new ClienteRepositoryPrisma(prismaClient);
    }
    async save(client) {
        const data = {
            nome: client.nome,
            email: client.email,
            status: client.status,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await this.prismaClient.cliente.create({
            data,
        });
    }
    async list() {
        const clientes = await this.prismaClient.cliente.findMany();
        return clientes.map(p => Client_1.Client.with({
            id: p.id,
            nome: p.nome,
            email: p.email,
            status: p.status,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt
        }));
    }
    async findById(id) {
        const cliente = await this.prismaClient.cliente.findUnique({
            where: { id }
        });
        if (!cliente) {
            throw new Error(`Cliente com ID ${id} não encontrado.`);
        }
        return Client_1.Client.with({
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            status: cliente.status,
            createdAt: cliente.createdAt,
            updatedAt: cliente.updatedAt,
        });
    }
    async update(client) {
        await this.prismaClient.cliente.update({
            where: { id: client.id },
            data: {
                nome: client.nome,
                email: client.email,
                status: client.status,
                updatedAt: new Date(),
            }
        });
    }
    async delete(id) {
        await this.prismaClient.cliente.delete({
            where: { id }
        });
    }
}
exports.ClienteRepositoryPrisma = ClienteRepositoryPrisma;
