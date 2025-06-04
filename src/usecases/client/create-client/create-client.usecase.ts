
import { UseCase } from "@/usecases/usecase";
import { Client } from "@/domain/clientes/entities/Client";
import { ClienteGateway } from "@/domain/clientes/gateway/clientegateway";
import { FinancaAtivoGateway } from "@/domain/ativos/gateway/ativosgateway";
import { FinancaAtivo } from "@/domain/ativos/entities/Ativo";

export type CreateClientInputDTO = {
    nome: string;
    email: string;
    status: boolean;
    ativos?: {
        nome: string;
        valorAtual: number;
    }[];
};

export type CreateClientOutputDTO = {
    id: string;
};

export class CreateClientUseCase implements UseCase<CreateClientInputDTO, CreateClientOutputDTO> {
    private constructor(
        private readonly clienteGateway: ClienteGateway,
        private readonly ativoGateway: FinancaAtivoGateway
    ) {}

    public static create(
        clienteGateway: ClienteGateway,
        ativoGateway: FinancaAtivoGateway
    ) {
        return new CreateClientUseCase(clienteGateway, ativoGateway);
    }

    public async execute({
                             nome,
                             email,
                             status,
                             ativos,
                         }: CreateClientInputDTO): Promise<CreateClientOutputDTO> {
        const client = Client.create(nome, email, status);

        await this.clienteGateway.save(client);

        if (ativos && ativos.length > 0) {
            for (const ativo of ativos) {
                const asset = FinancaAtivo.create(ativo.nome, ativo.valorAtual, client.id);
                await this.ativoGateway.save(asset);
            }
        }
        return this.presentOutput(client);
    }

    private presentOutput(client: Client): CreateClientOutputDTO {
        return {
            id: client.id,
        };
    }
}
