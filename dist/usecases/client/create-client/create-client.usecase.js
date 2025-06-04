"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientUseCase = void 0;
const Client_1 = require("@/domain/clientes/entities/Client");
const Ativo_1 = require("@/domain/ativos/entities/Ativo");
class CreateClientUseCase {
    constructor(clienteGateway, ativoGateway) {
        this.clienteGateway = clienteGateway;
        this.ativoGateway = ativoGateway;
    }
    static create(clienteGateway, ativoGateway) {
        return new CreateClientUseCase(clienteGateway, ativoGateway);
    }
    async execute({ nome, email, status, ativos, }) {
        const client = Client_1.Client.create(nome, email, status);
        // salva o cliente
        await this.clienteGateway.save(client);
        // se existirem ativos, cria e salva cada um com o ID do cliente
        if (ativos && ativos.length > 0) {
            for (const ativo of ativos) {
                const asset = Ativo_1.FinancaAtivo.create(ativo.nome, ativo.valorAtual, client.id);
                await this.ativoGateway.save(asset);
            }
        }
        return this.presentOutput(client);
    }
    presentOutput(client) {
        return {
            id: client.id,
        };
    }
}
exports.CreateClientUseCase = CreateClientUseCase;
