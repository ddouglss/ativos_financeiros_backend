import {Client} from "@/domain/clientes/entities/Client";

export interface ClienteGateway {
    save(client: Client): Promise<void>;
    list(): Promise<Client[]>;
    findById(id: string): Promise<Client>;
    update(client: Client): Promise<void>;
    delete(id: string): Promise<void>;
}