"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFinancialAssetsUseCase = void 0;
class ListFinancialAssetsUseCase {
    constructor(financialAssetGateway) {
        this.financialAssetGateway = financialAssetGateway;
    }
    // Aqui recebe qualquer implementação de FinancaAtivoGateway (ex: AtivoRepositoryPrisma)
    static create(financialAssetGateway) {
        return new ListFinancialAssetsUseCase(financialAssetGateway);
    }
    async execute() {
        const assets = await this.financialAssetGateway.listByClient("cliente1");
        return assets.map(asset => ({
            id: asset.id,
            nome: asset.nome,
            valorAtual: asset.valorAtual,
            clientId: asset.clientId,
        }));
    }
}
exports.ListFinancialAssetsUseCase = ListFinancialAssetsUseCase;
