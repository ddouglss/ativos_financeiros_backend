import {UseCase} from "@/usecases/usecase";
import {Client} from "@/domain/clientes/entities/Client";
import {ClienteGateway} from "@/domain/clientes/gateway/clientegateway";

export type CreateClientInputDTO = {
    nome: string,
    email: string,
    status: boolean
}

export type CreateClientOutputDTO = {
    id: string;
};

export class CreateClientUseCase implements UseCase<CreateClientInputDTO, CreateClientOutputDTO> {

    private constructor( private readonly clienteGateway: ClienteGateway) {}

    public static create(clientGateway: ClienteGateway ){
        return new CreateClientUseCase(clientGateway)
    }

    public async execute({nome, email, status}: CreateClientInputDTO): Promise<CreateClientOutputDTO>{
        const client = Client.create(nome, email, status);

        await this.clienteGateway.save(client);

        const output = this.presentOutput(client);

        return output;
    }

    private presentOutput(client: Client): CreateClientOutputDTO {
        return {
            id: client.id,
        }
    }
}
