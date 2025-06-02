import { FinancaAtivo } from "@/domain/ativos/entities/Ativo";

export interface FinancaAtivoGateway {
    save(asset: FinancaAtivo): Promise<void>;
    listByClient(clientId: string): Promise<FinancaAtivo[]>;
}
