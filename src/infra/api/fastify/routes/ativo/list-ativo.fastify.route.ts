import { HttpMethod, Route } from "@/infra/api/fastify/routes/route";
import { FastifyRequest, FastifyReply } from "fastify";
import { ListAtivoUseCase, ListAtivoOutputDTO } from "@/usecases/ativo/list-ativo/list-ativos.usecase";

export type ListAtivoResponseDto = {
    ativos: {
        id: string;
        nome: string;
        valorAtual: number;
        clientId: string;
    }[];
};

export class ListAtivoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listAtivoService: ListAtivoUseCase
    ) {}

    public static create(listAtivoService: ListAtivoUseCase): ListAtivoRoute {
        return new ListAtivoRoute(
            "/ativos",
            HttpMethod.GET,
            listAtivoService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
            const output: ListAtivoOutputDTO = await this.listAtivoService.execute();
            const responseBody = this.present(output);
            reply.status(200).send(responseBody);
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: ListAtivoOutputDTO): ListAtivoResponseDto {
        return {
            ativos: input.ativo.map(ativo => ({
                id: ativo.id,
                nome: ativo.nome,
                valorAtual: ativo.valorAtual,
                clientId: ativo.clientId
            }))
        };
    }
}