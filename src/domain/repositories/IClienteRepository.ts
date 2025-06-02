import { Cliente } from '../entities/Cliente'

export interface IClienteRepository {
    create(cliente: Cliente): Promise<Cliente>;
    findAll(): Promise<Cliente[]>;
    update(cliente: Cliente): Promise<Cliente>;
}
