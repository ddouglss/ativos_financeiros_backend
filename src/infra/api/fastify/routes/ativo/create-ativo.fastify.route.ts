import { HttpMethod, Route } from "@/infra/api/fastify/routes/route";
import { ListFinancialAssetsUseCase } from "@/usecases/ativo/create-ativo/list-ativos.usecase";
import { FastifyRequest, FastifyReply } from "fastify";

export type ListFinancialAssetsResponseDTO = {
    ativos: {
        id: string;
        nome: string;
        valorAtual: number;
        clientId: string;
    }[];
};

export class ListFinancialAssetsRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listAssetsUseCase: ListFinancialAssetsUseCase
    ) {}

    public static create(listAssetsUseCase: ListFinancialAssetsUseCase) {
        return new ListFinancialAssetsRoute("/ativos", HttpMethod.GET, listAssetsUseCase);
    }

    public getHandler() {
        return async (_request: FastifyRequest, reply: FastifyReply) => {
            try {
                const assets = await this.listAssetsUseCase.execute();

                const responseBody = this.presentOutput(assets);

                reply.status(200).send(responseBody);
            } catch (error) {
                reply.status(500).send({ message: "Erro ao listar ativos financeiros" });
            }
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private presentOutput(assets: ListFinancialAssetsUseCase["execute"] extends (...args: any) => Promise<infer R> ? R : never): ListFinancialAssetsResponseDTO {
        return {
            ativos: assets.map(asset => ({
                id: asset.id,
                nome: asset.nome,
                valorAtual: asset.valorAtual,
                clientId: asset.clientId,
            })),
        };
    }
}
