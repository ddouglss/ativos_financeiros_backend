import * as crypto from "node:crypto";

export type AtivosProps = {
    id: string;
    nome: string;
    valorAtual: number;
    clientId: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class FinancaAtivo {
    private constructor(private _props: AtivosProps) {}

    public static create(nome: string, valorAtual: number, clientId: string): FinancaAtivo {
        return new FinancaAtivo({
            id: crypto.randomUUID(),
            nome,
            valorAtual,
            clientId
        });

    }

    public static with(props: AtivosProps): FinancaAtivo {
        return new FinancaAtivo(props);
    }

    public get id() {
        return this._props.id;
    }

    public get nome() {
        return this._props.nome;
    }

    public get valorAtual() {
        return this._props.valorAtual;
    }

    public get clientId() {
        return this._props.clientId;
    }

    public get createdAt() {
        return this._props.createdAt;
    }

    public get updatedAt() {
        return this._props.updatedAt;
    }

    public toObject() {
        return { ...this._props };
    }
}
