import { UseCase } from "@/usecases/usecase";
import { FinancaAtivo } from "@/domain/ativos/entities/Ativo";
import { FinancaAtivoGateway } from "@/domain/ativos/gateway/ativosgateway";

export type UpdateAtivoInputDTO = {
    id: string;
    nome: string;
    valorAtual: number;
    clientId: string;
};

export type UpdateAtivoOutputDTO = {
    ativo:{
        id: string;
        nome: string;
        valorAtual: number;
        clientId: string;

    }
};

export class UpdateAtivoUseCase implements UseCase<UpdateAtivoInputDTO, UpdateAtivoOutputDTO> {
    private constructor(private readonly ativoGateway: FinancaAtivoGateway) {}

    public static create(gateway: FinancaAtivoGateway) {
        return new UpdateAtivoUseCase(gateway);
    }

    public async execute(input: UpdateAtivoInputDTO): Promise<UpdateAtivoOutputDTO> {
        const ativoExistente = await this.ativoGateway.findById(input.id);

        if (!ativoExistente) {
            throw new Error("Ativo não encontrado");
        }

        const updatedAtivo = FinancaAtivo.with({
            id: ativoExistente.id,
            nome: input.nome,
            valorAtual: input.valorAtual,
            clientId: input.clientId,
            createdAt: ativoExistente.createdAt,
            updatedAt: new Date()
        });

        const savedAtivo = await this.ativoGateway.update(updatedAtivo);

        return this.presenteOutput(savedAtivo);
    }


    private presenteOutput(ativo: FinancaAtivo): UpdateAtivoOutputDTO {
        const ativoData = ativo.toObject();
        return {
            ativo: {
                id: ativoData.id,
                nome: ativoData.nome,
                valorAtual: ativoData.valorAtual,
                clientId: ativoData.clientId,
            }
        };
    }
}
