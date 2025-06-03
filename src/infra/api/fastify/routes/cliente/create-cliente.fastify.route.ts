import { FastifyRequest, FastifyReply } from "fastify";
import { HttpMethod, Route } from "@/infra/api/fastify/routes/route";
import {
    CreateClientInputDTO,
    CreateClientOutputDTO,
    CreateClientUseCase
} from "@/usecases/client/create-client/create-client.usecase";

export type CreateClienteResponseDTO = {
    id: string;
}

export class CreateClienteRoute implements Route<{ Body: CreateClientInputDTO }> {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createClienteService: CreateClientUseCase
    ) {}

    public static create(createClienteService: CreateClientUseCase): CreateClienteRoute {
        return new CreateClienteRoute("/clientes", HttpMethod.POST, createClienteService);
    }

    public getHandler() {
        return async (request: FastifyRequest<{ Body: CreateClientInputDTO }>, reply: FastifyReply) => {
            const { nome, email, status } = request.body;

            const input: CreateClientInputDTO = {
                nome,
                email,
                status
            };

            const output: CreateClientOutputDTO = await this.createClienteService.execute(input);

            reply.code(201).send(this.presentOutput(output));
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private presentOutput(input: CreateClienteResponseDTO): CreateClienteResponseDTO {
        return { id: input.id };
    }
}
