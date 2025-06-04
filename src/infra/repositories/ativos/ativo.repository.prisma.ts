import { FinancaAtivo } from "@/domain/ativos/entities/Ativo";
import { FinancaAtivoGateway } from "@/domain/ativos/gateway/ativosgateway";
import { PrismaClient } from "@prisma/client";

export class AtivoRepositoryPrisma implements FinancaAtivoGateway {
    constructor(private readonly prisma: PrismaClient) {}

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

    async listByClient(clientId: string): Promise<FinancaAtivo[]> {
        const ativos = await this.prisma.ativo.findMany({ where: { clientId } });

        return ativos.map((a) =>
            FinancaAtivo.with({
                id: a.id,
                nome: a.nome,
                valorAtual: Number(a.valorAtual),
                clientId: a.clientId,
                createdAt: a.createdAt,
                updatedAt: a.updatedAt,
            })
        );
    }

    async listAll(): Promise<FinancaAtivo[]> {
        const ativos = await this.prisma.ativo.findMany();

        return ativos.map((a) =>
            FinancaAtivo.with({
                id: a.id,
                nome: a.nome,
                valorAtual: Number(a.valorAtual),
                clientId: a.clientId,
                createdAt: a.createdAt,
                updatedAt: a.updatedAt,
            })
        );
    }

    async findById(id: string): Promise<FinancaAtivo> {
        const ativo = await this.prisma.ativo.findUnique({ where: { id } });

        if (!ativo) throw new Error("Ativo não encontrado");

        return FinancaAtivo.with({
            id: ativo.id,
            nome: ativo.nome,
            valorAtual: Number(ativo.valorAtual),
            clientId: ativo.clientId,
            createdAt: ativo.createdAt,
            updatedAt: ativo.updatedAt,
        });
    }

    async update(ativo: FinancaAtivo): Promise<FinancaAtivo> {
        const updated = await this.prisma.ativo.update({
            where: { id: ativo.id },
            data: {
                nome: ativo.nome,
                valorAtual: ativo.valorAtual,
                clientId: ativo.clientId,
                updatedAt: new Date(),
            },
        });

        return FinancaAtivo.with({
            id: updated.id,
            nome: updated.nome,
            valorAtual: Number(updated.valorAtual),
            clientId: updated.clientId,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.ativo.delete({ where: { id } });
    }
}
