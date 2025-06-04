"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAtivoUseCase = void 0;
class ListAtivoUseCase {
    constructor(ativoGateway) {
        this.ativoGateway = ativoGateway;
    }
    static create(ativoGateway) {
        return new ListAtivoUseCase(ativoGateway);
    }
    async execute() {
        const ativos = await this.ativoGateway.listAll();
        return this.presentOutput(ativos);
    }
    presentOutput(ativos) {
        return {
            ativos: ativos.map(ativo => ({
                id: ativo.id,
                nome: ativo.nome,
                valorAtual: ativo.valorAtual,
                clientId: ativo.clientId
            }))
        };
    }
}
exports.ListAtivoUseCase = ListAtivoUseCase;
