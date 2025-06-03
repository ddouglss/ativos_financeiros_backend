import { FinancaAtivo } from "@/domain/ativos/entities/Ativo";
import { FinancaAtivoGateway } from "@/domain/ativos/gateway/ativosgateway";
import { PrismaClient } from "@prisma/client";

export class AtivoRepositoryPrisma implements FinancaAtivoGateway {

    constructor(private readonly prisma: PrismaClient) {}

    public static create(prisma: PrismaClient): AtivoRepositoryPrisma {
        return new AtivoRepositoryPrisma(prisma);
    }

    async save(asset: FinancaAtivo): Promise<void> {
        await this.prisma.ativo.create({
            data: {
                nome: asset.nome,
                valorAtual: asset.valorAtual,
                clientId: asset.clientId,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
    }

    async listByClient(clientId: string): Promise<FinancaAtivo[]> {
        const ativos = await this.prisma.ativo.findMany({
            where: { clientId }
        });

        return ativos.map((ativo) => FinancaAtivo.with({
            id: ativo.id,
            nome: ativo.nome,
            valorAtual: Number(ativo.valorAtual),
            clientId: ativo.clientId,
            createdAt: ativo.createdAt,
            updatedAt: ativo.updatedAt,
        }));
    }
}
