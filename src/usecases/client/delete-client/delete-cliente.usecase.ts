import { ClienteGateway } from "@/domain/clientes/gateway/clientegateway";
import { UseCase } from "@/usecases/usecase";

export type DeleteClientInputDTO = {
    id: string;
};

export type DeleteClientOutputDTO = {
    success: boolean;
    message: string;
};

export class DeleteClienteUsecase implements UseCase<DeleteClientInputDTO, DeleteClientOutputDTO> {
    private constructor(private readonly clienteGateway: ClienteGateway) {}

    public static create(clienteGateway: ClienteGateway) {
        return new DeleteClienteUsecase(clienteGateway);
    }

    public async execute(input: DeleteClientInputDTO): Promise<DeleteClientOutputDTO> {
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
