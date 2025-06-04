import { FinancaAtivoGateway } from "@/domain/ativos/gateway/ativosgateway";
import { UseCase } from "@/usecases/usecase";

export type DeleteAtivoInputDTO = {
    id: string;
};

export type DeleteAtivoOutputDTO = {
    success: boolean;
    message: string;
};

export class DeleteAtivoUseCase implements UseCase<DeleteAtivoInputDTO, DeleteAtivoOutputDTO> {
    private constructor(private readonly ativoGateway: FinancaAtivoGateway) {}

    public static create(ativoGateway: FinancaAtivoGateway) {
        return new DeleteAtivoUseCase(ativoGateway);
    }

    public async execute(input: DeleteAtivoInputDTO): Promise<DeleteAtivoOutputDTO> {
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
