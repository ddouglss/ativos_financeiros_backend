import { UseCase } from "@/usecases/usecase";
import { FinancaAtivo } from "@/domain/ativos/entities/Ativo";
import { FinancaAtivoGateway } from "@/domain/ativos/gateway/ativosgateway";

export type CreateAtivoInputDTO = {
    nome: string;
    valorAtual: number;
    clientId: string;
};

export type CreateAtivoOutputDTO = {
    id: string;
};

export class CreateAtivoUseCase implements UseCase<CreateAtivoInputDTO, CreateAtivoOutputDTO> {
    private constructor(private readonly ativoGateway: FinancaAtivoGateway) {}

    public static create(ativoGateway: FinancaAtivoGateway): CreateAtivoUseCase {
        return new CreateAtivoUseCase(ativoGateway);
    }

    public async execute(input: CreateAtivoInputDTO): Promise<CreateAtivoOutputDTO> {
        const ativo = FinancaAtivo.create(input.nome, input.valorAtual, input.clientId);

        await this.ativoGateway.save(ativo);

        return this.presentOutput(ativo);
    }

    private presentOutput(ativo: FinancaAtivo): CreateAtivoOutputDTO {
        return {
            id: ativo.id,
        };
    }
}
