import { UseCase } from "@/usecases/usecase";
import { FinancaAtivoGateway } from "@/domain/ativos/gateway/ativosgateway";

export type ListFinancialAssetsOutputDTO = {
    id: string;
    nome: string;
    valorAtual: number;
    clientId: string;
}[];

export class ListFinancialAssetsUseCase implements UseCase<void, ListFinancialAssetsOutputDTO> {

    private constructor(private readonly financialAssetGateway: FinancaAtivoGateway) {}

    public static create(financialAssetGateway: FinancaAtivoGateway) {
        return new ListFinancialAssetsUseCase(financialAssetGateway);
    }

    public async execute(): Promise<ListFinancialAssetsOutputDTO> {
        const assets = await this.financialAssetGateway.listByClient("cliente1"); // ou .listAll() se existir

        return assets.map(asset => ({
            id: asset.id,
            nome: asset.nome,
            valorAtual: asset.valorAtual,
            clientId: asset.clientId,
        }));
    }
}
