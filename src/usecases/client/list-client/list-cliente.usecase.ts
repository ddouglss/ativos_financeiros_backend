import {UseCase} from "@/usecases/usecase";
import {ClienteGateway} from "@/domain/clientes/gateway/clientegateway";
import {Client} from "@/domain/clientes/entities/Client";

export type ListClientInputDTO = void;

export type ListClientOutputDTO = {
    cliente: {
        id: string;
        nome: string;
        email: string;
        status: boolean;
    }[];
}

export class ListClientUseCase implements UseCase<ListClientInputDTO, ListClientOutputDTO> {
    private constructor(private readonly clienteGateway: ClienteGateway) {}

    public static create(clienteGateway: ClienteGateway) {
        return new ListClientUseCase(clienteGateway);
    }

    public async execute(): Promise<ListClientOutputDTO> {
        const clientes = await this.clienteGateway.list();

        const output = this.presentOutput(clientes);
        return output;
    }

    private presentOutput(cliente: Client[]): ListClientOutputDTO {
        return {
            cliente: cliente.map((p) => ({
                id: p.id,
                nome: p.nome,
                email: p.email,
                status: p.status,
            }))
        }
    }
}