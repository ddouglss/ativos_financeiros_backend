"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAtivoUseCase = void 0;
const Ativo_1 = require("@/domain/ativos/entities/Ativo");
class CreateAtivoUseCase {
    constructor(ativoGateway) {
        this.ativoGateway = ativoGateway;
    }
    static create(ativoGateway) {
        return new CreateAtivoUseCase(ativoGateway);
    }
    async execute(input) {
        const ativo = Ativo_1.FinancaAtivo.create(input.nome, input.valorAtual, input.clientId);
        await this.ativoGateway.save(ativo);
        return this.presentOutput(ativo);
    }
    presentOutput(ativo) {
        return {
            id: ativo.id,
        };
    }
}
exports.CreateAtivoUseCase = CreateAtivoUseCase;
