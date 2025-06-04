import { FinancaAtivo } from "@/domain/ativos/entities/Ativo";

export interface FinancaAtivoGateway {
    save(asset: FinancaAtivo): Promise<void>;
    listByClient(clientId: string): Promise<FinancaAtivo[]>;
    listAll(): Promise<FinancaAtivo[]>;
    findById(id: string): Promise<FinancaAtivo>;
    update(list: FinancaAtivo): Promise<FinancaAtivo>;
    delete(id: string): Promise<void>;

}
