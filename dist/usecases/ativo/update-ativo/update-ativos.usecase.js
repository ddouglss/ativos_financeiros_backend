"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAtivoUseCase = void 0;
const Ativo_1 = require("@/domain/ativos/entities/Ativo");
class UpdateAtivoUseCase {
    constructor(ativoGateway) {
        this.ativoGateway = ativoGateway;
    }
    static create(gateway) {
        return new UpdateAtivoUseCase(gateway);
    }
    async execute(input) {
        const ativoExistente = await this.ativoGateway.findById(input.id);
        if (!ativoExistente) {
            throw new Error("Ativo não encontrado");
        }
        // @ts-ignore
        const updatedAtivo = Ativo_1.FinancaAtivo.create(input.nome, input.valorAtual, ativoExistente.clientId);
        const savedAtivo = await this.ativoGateway.update(updatedAtivo);
        return this.presenteOutput(savedAtivo);
    }
    presenteOutput(ativo) {
        const ativoData = ativo.toObject();
        return {
            ativo: {
                id: ativoData.id,
                nome: ativoData.nome,
                valorAtual: ativoData.valorAtual,
                clientId: ativoData.clientId,
            }
        };
    }
}
exports.UpdateAtivoUseCase = UpdateAtivoUseCase;
