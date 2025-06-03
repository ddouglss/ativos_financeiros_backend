import { HttpMethod, Route } from "@/infra/api/fastify/routes/route";
import { ListClientUseCase, ListClientOutputDTO } from "@/usecases/client/list-client/list-cliente.usecase";
import { FastifyRequest, FastifyReply } from "fastify";

export type ListClienteResponseDto = {
    clientes: {
        id: string;
        nome: string;
        email: string;
        status: boolean;
    }[];
};

export class ListClienteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listClienteService: ListClientUseCase
    ) {}

    public static create(listClienteService: ListClientUseCase): ListClienteRoute {
        return new ListClienteRoute(
            "/clientes",
            HttpMethod.GET,
            listClienteService
        );
    }

    public getHandler() {
        return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
            const output: ListClientOutputDTO = await this.listClienteService.execute();
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

    private present(input: ListClientOutputDTO): ListClienteResponseDto {
        return {
            clientes: input.cliente.map(cliente => ({
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email,
                status: cliente.status
            }))
        };
    }
}
