import { UseCase } from "@/usecases/usecase";
import { ClienteGateway } from "@/domain/clientes/gateway/clientegateway";
import { Client } from "@/domain/clientes/entities/Client";

export type UpdateClientInputDTO = {
    id: string;
    nome: string;
    email: string;
    status: boolean;
};

export type UpdateClientOutputDTO = {
    cliente: {
        id: string;
        nome: string;
        email: string;
        status: boolean;
    };
};

export class UpdateClientUseCase implements UseCase<UpdateClientInputDTO, UpdateClientOutputDTO> {
    private constructor(private readonly clienteGateway: ClienteGateway) {}

    public static create(clienteGateway: ClienteGateway) {
        return new UpdateClientUseCase(clienteGateway);
    }

    public async execute(input: UpdateClientInputDTO): Promise<UpdateClientOutputDTO> {
        const existingClient = await this.clienteGateway.findById(input.id);
        if (!existingClient) {
            throw new Error("Cliente não encontrado");
        }

        const updatedClient = Client.with({
            id: input.id,
            nome: input.nome,
            email: input.email,
            status: input.status,
            createdAt: existingClient.toObject().createdAt,
            updatedAt: new Date()
        });

        const savedClient = await this.clienteGateway.update(updatedClient);

        return this.presenteOutput(savedClient);
    }


    private presenteOutput(cliente: Client): UpdateClientOutputDTO {
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