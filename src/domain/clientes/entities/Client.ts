import * as crypto from "node:crypto";

export type ClientProps = {
    id: string;
    nome: string;
    email: string;
    status: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Client {
    private constructor(private _props: ClientProps) {}

    public static create(nome: string, email: string, status: boolean): Client {
        return new Client({
            id: crypto.randomUUID(),
            nome,
            email,
            status,
        });
    }

    public static with(props: ClientProps): Client {
        return new Client(props);
    }

    public get id() {
        return this._props.id;
    }

    public get nome() {
        return this._props.nome;
    }

    public get email() {
        return this._props.email;
    }

    public get status() {
        return this._props.status;
    }

    public toObject() {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            status: this.status,
            createdAt: this._props.createdAt,
            updatedAt: this._props.updatedAt,
        };
    }

}
