import * as crypto from "node:crypto";

export type AtivosProps = {
    id: string;
    nome: string;
    valorAtual: number;
    clientId: string;
};

export class FinancaAtivo {
    private constructor(private _props: AtivosProps) {}

    public static create(props: Omit<AtivosProps, "id">): FinancaAtivo {
        return new FinancaAtivo({
            id: crypto.randomUUID(),
            ...props,
        });
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

    public toObject() {
        return { ...this._props };
    }
}
