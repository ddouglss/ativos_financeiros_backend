import { Client } from '@/domain/clientes/entities/Client'

export interface IClienteRepository {
    create(cliente: Client): Promise<Client>;
    findAll(): Promise<Client[]>;
    update(cliente: Client): Promise<Client>;
}
