"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAtivoUseCase = void 0;
class DeleteAtivoUseCase {
    constructor(ativoGateway) {
        this.ativoGateway = ativoGateway;
    }
    static create(ativoGateway) {
        return new DeleteAtivoUseCase(ativoGateway);
    }
    async execute(input) {
        const ativo = await this.ativoGateway.findById(input.id);
        if (!ativo) {
            return {
                success: false,
                message: "Ativo não encontrado",
            };
        }
        await this.ativoGateway.delete(input.id);
        return {
            success: true,
            message: "Ativo deletado com sucesso",
        };
    }
}
exports.DeleteAtivoUseCase = DeleteAtivoUseCase;
