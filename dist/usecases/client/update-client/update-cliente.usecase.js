"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientUseCase = void 0;
const Client_1 = require("@/domain/clientes/entities/Client");
class UpdateClientUseCase {
    constructor(clienteGateway) {
        this.clienteGateway = clienteGateway;
    }
    static create(clienteGateway) {
        return new UpdateClientUseCase(clienteGateway);
    }
    async execute(input) {
        // Primeiro, busca o cliente existente
        const existingClient = await this.clienteGateway.findById(input.id);
        if (!existingClient) {
            throw new Error("Cliente não encontrado");
        }
        // Cria uma nova instância de Client com os dados atualizados
        // @ts-ignore
        const updatedClient = Client_1.Client.create({
            id: input.id,
            nome: input.nome,
            email: input.email,
            status: input.status
        });
        // Atualiza o cliente usando o gateway
        const savedClient = await this.clienteGateway.update(updatedClient);
        // Formata a saída
        // @ts-ignore
        return this.presenteOutput(savedClient);
    }
    presenteOutput(cliente) {
        const clientData = cliente.toObject();
        return {
            cliente: {
                id: clientData.id,
                nome: clientData.nome,
                email: clientData.email,
                status: clientData.status
            }
        };
    }
}
exports.UpdateClientUseCase = UpdateClientUseCase;
