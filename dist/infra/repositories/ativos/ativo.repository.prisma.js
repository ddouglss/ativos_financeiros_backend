"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtivoRepositoryPrisma = void 0;
const Ativo_1 = require("@/domain/ativos/entities/Ativo");
class AtivoRepositoryPrisma {
    constructor(prisma) {
        this.prisma = prisma;
    }
    static create(prisma) {
        return new AtivoRepositoryPrisma(prisma);
    }
    async save(asset) {
        await this.prisma.ativo.create({
            data: {
                nome: asset.nome,
                valorAtual: asset.valorAtual,
                clientId: asset.clientId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    }
    async listByClient(clientId) {
        const ativos = await this.prisma.ativo.findMany({
            where: { clientId },
        });
        return ativos.map((ativo) => Ativo_1.FinancaAtivo.with({
            id: ativo.id,
            nome: ativo.nome,
            valorAtual: Number(ativo.valorAtual),
            clientId: ativo.clientId,
            createdAt: ativo.createdAt,
            updatedAt: ativo.updatedAt,
        }));
    }
    async listAll() {
        const ativos = await this.prisma.ativo.findMany();
        return ativos.map((ativo) => Ativo_1.FinancaAtivo.with({
            id: ativo.id,
            nome: ativo.nome,
            valorAtual: Number(ativo.valorAtual),
            clientId: ativo.clientId,
            createdAt: ativo.createdAt,
            updatedAt: ativo.updatedAt,
        }));
    }
    async findById(id) {
        const ativo = await this.prisma.ativo.findUnique({
            where: { id },
        });
        if (!ativo) {
            throw new Error(`Ativo com ID ${id} não encontrado`);
        }
        return Ativo_1.FinancaAtivo.with({
            id: ativo.id,
            nome: ativo.nome,
            valorAtual: Number(ativo.valorAtual),
            clientId: ativo.clientId,
            createdAt: ativo.createdAt,
            updatedAt: ativo.updatedAt,
        });
    }
    async update(list) {
        await this.prisma.ativo.update({
            where: { id: list.id },
            data: {
                nome: list.nome,
                valorAtual: list.valorAtual,
                clientId: list.clientId,
                updatedAt: new Date(),
            },
        });
    }
    async delete(id) {
        await this.prisma.ativo.delete({
            where: { id },
        });
    }
}
exports.AtivoRepositoryPrisma = AtivoRepositoryPrisma;
