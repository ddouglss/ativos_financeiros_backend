import { UseCase } from "@/usecases/usecase";
import { FinancaAtivoGateway } from "@/domain/ativos/gateway/ativosgateway";
import { FinancaAtivo } from "@/domain/ativos/entities/Ativo";

export type ListAtivoInputDTO = void;

export type ListAtivoOutputDTO = {
    ativo: {
        id: string;
        nome: string;
        valorAtual: number;
        clientId: string;
    }[];
}

export class ListAtivoUseCase implements UseCase<ListAtivoInputDTO, ListAtivoOutputDTO> {
    private constructor(private readonly ativoGateway: FinancaAtivoGateway) {}

    public static create(ativoGateway: FinancaAtivoGateway) {
        return new ListAtivoUseCase(ativoGateway);
    }

    public async execute(): Promise<ListAtivoOutputDTO> {
        const ativos = await this.ativoGateway.listAll();

        const output = this.presentOutput(ativos);
        return output;
    }

    private presentOutput(ativo: FinancaAtivo[]): ListAtivoOutputDTO {
        if (!Array.isArray(ativo)) {
            throw new Error("Ativos inválidos");
        }

        return {
            ativo: ativo.map((a) => ({
                id: a.id,
                nome: a.nome,
                valorAtual: a.valorAtual,
                clientId: a.clientId
            }))
        }
    }
}
