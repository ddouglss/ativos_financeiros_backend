"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtivoRepositoryPrisma = void 0;
class AtivoRepositoryPrisma {
    constructor(prisma) {
        this.prisma = prisma;
    }
    listByClient(clientId) {
        throw new Error("Method not implemented.");
    }
    listAll() {
        throw new Error("Method not implemented.");
    }
    findById(id) {
        throw new Error("Method not implemented.");
    }
    update(list) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    static create(prisma) {
        return new AtivoRepositoryPrisma(prisma);
    }
    async save(ativo) {
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
exports.AtivoRepositoryPrisma = AtivoRepositoryPrisma;
