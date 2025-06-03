import { HttpMethod, Route } from "@/infra/api/fastify/routes/route";
import {
    UpdateClientInputDTO,
    UpdateClientOutputDTO,
    UpdateClientUseCase
} from "@/usecases/client/update-client/update-cliente.usecase";
import { FastifyRequest, FastifyReply } from "fastify";

export type UpdateClienteResponseDto = {
    clientes: {
        id: string;
        nome: string;
        email: string;
        status: boolean;
    };
};

type UpdateRequest = FastifyRequest<{
    Params: { id: string };
    Body: {
        nome: string;
        email: string;
        status: boolean;
    };
}>;

export class UpdateClienteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateClienteService: UpdateClientUseCase
    ) {}

    public static create(updateClienteService: UpdateClientUseCase): UpdateClienteRoute {
        return new UpdateClienteRoute("/clientes/:id", HttpMethod.PUT, updateClienteService);
    }

    public getHandler() {
        return async (request: UpdateRequest, reply: FastifyReply): Promise<void> => {
            const { id } = request.params;
            const { nome, email, status } = request.body;

            const input: UpdateClientInputDTO = {
                id,
                nome,
                email,
                status,
            };

            const output: UpdateClientOutputDTO = await this.updateClienteService.execute(input);
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

    private present(input: UpdateClientOutputDTO): UpdateClienteResponseDto {
        return {
            clientes: input.cliente
        };
    }
}
