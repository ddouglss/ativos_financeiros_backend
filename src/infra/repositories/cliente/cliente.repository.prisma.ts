import { Client } from "@/domain/clientes/entities/Client";
import {ClienteGateway} from "@/domain/clientes/gateway/clientegateway";
import { PrismaClient } from "@prisma/client";

export class ClienteRepositoryPrisma implements ClienteGateway {

     constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient): ClienteRepositoryPrisma {
        return new ClienteRepositoryPrisma(prismaClient);
    }

    public async save(client: Client): Promise<void> {
        const data ={
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
    async list(): Promise<Client[]> {
        const clientes = await this.prismaClient.cliente.findMany();

        return clientes.map(p => Client.with({
            id: p.id,
            nome: p.nome,
            email: p.email,
            status: p.status,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt
        }));
    }

    async findById(id: string): Promise<Client> {
        const cliente = await this.prismaClient.cliente.findUnique({
            where: { id }
        });

        if (!cliente) {
            throw new Error(`Cliente com ID ${id} não encontrado.`);
        }

        return Client.with({
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            status: cliente.status,
            createdAt: cliente.createdAt,
            updatedAt: cliente.updatedAt,
        });
    }

    async update(client: Client): Promise<void> {
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

    async delete(id: string): Promise<void> {
        await this.prismaClient.cliente.delete({
            where: { id }
        });
    }

}