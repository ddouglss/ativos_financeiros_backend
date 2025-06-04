import { FinancaAtivo } from "@/domain/ativos/entities/Ativo";
import { FinancaAtivoGateway } from "@/domain/ativos/gateway/ativosgateway";
import { PrismaClient } from "@prisma/client";

export class AtivoRepositoryPrisma implements FinancaAtivoGateway {
    constructor(private readonly prisma: PrismaClient) {}

    listByClient(clientId: string): Promise<FinancaAtivo[]> {
        throw new Error("Method not implemented.");
    }
    listAll(): Promise<FinancaAtivo[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<FinancaAtivo> {
        throw new Error("Method not implemented.");
    }
    update(list: FinancaAtivo): Promise<FinancaAtivo> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public static create(prisma: PrismaClient): AtivoRepositoryPrisma {
        return new AtivoRepositoryPrisma(prisma);
    }

    async save(ativo: FinancaAtivo): Promise<void> {
        await this.prisma.ativo.create({
            data: {
                nome: ativo.nome,
                valorAtual: ativo.valorAtual,
                clientId: ativo.clientId,
                createdAt: ativo.createdAt,
                updatedAt: ativo.updatedAt,
            },
        });
    }
}
