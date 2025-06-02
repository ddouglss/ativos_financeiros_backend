import * as crypto from "node:crypto";

export type ClientProps = {
    id: string;
    nome: string;
    email: string;
    status: boolean;
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
        return { ...this._props };
    }
}
