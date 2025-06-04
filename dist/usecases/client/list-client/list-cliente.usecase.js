"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClientUseCase = void 0;
class ListClientUseCase {
    constructor(clienteGateway) {
        this.clienteGateway = clienteGateway;
    }
    static create(clienteGateway) {
        return new ListClientUseCase(clienteGateway);
    }
    async execute() {
        const clientes = await this.clienteGateway.list();
        const output = this.presenteOutput(clientes);
        return output;
    }
    presenteOutput(cliente) {
        return {
            cliente: cliente.map((p) => ({
                id: p.id,
                nome: p.nome,
                email: p.email,
                status: p.status,
            }))
        };
    }
}
exports.ListClientUseCase = ListClientUseCase;
