"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClienteUsecase = void 0;
class DeleteClienteUsecase {
    constructor(clienteGateway) {
        this.clienteGateway = clienteGateway;
    }
    static create(clienteGateway) {
        return new DeleteClienteUsecase(clienteGateway);
    }
    async execute(input) {
        const client = await this.clienteGateway.findById(input.id);
        if (!client) {
            return {
                success: false,
                message: "Cliente não encontrado",
            };
        }
        await this.clienteGateway.delete(input.id);
        return {
            success: true,
            message: "Cliente deletado com sucesso",
        };
    }
}
exports.DeleteClienteUsecase = DeleteClienteUsecase;
