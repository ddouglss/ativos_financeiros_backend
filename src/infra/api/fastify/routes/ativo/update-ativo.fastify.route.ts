import { HttpMethod, Route } from "@/infra/api/fastify/routes/route";
import {
    UpdateAtivoInputDTO,
    UpdateAtivoOutputDTO,
    UpdateAtivoUseCase
} from "@/usecases/ativo/update-ativo/update-ativos.usecase";
import { FastifyRequest, FastifyReply } from "fastify";

export type UpdateAtivoResponseDto = {
    ativos: {
        id: string;
        nome: string;
        valorAtual: number;
        clientId: string;
    };
};

type UpdateRequest = FastifyRequest<{
    Params: { id: string };
    Body: {
        nome: string;
        valorAtual: number;
        clientId: string;
    };
}>;

export class UpdateAtivoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateAtivoService: UpdateAtivoUseCase
    ) {}

    public static create(updateAtivoService: UpdateAtivoUseCase): UpdateAtivoRoute {
        return new UpdateAtivoRoute("/ativos/:id", HttpMethod.PUT, updateAtivoService);
    }

    public getHandler() {
        return async (request: UpdateRequest, reply: FastifyReply): Promise<void> => {
            const { id } = request.params;
            const { nome, valorAtual, clientId } = request.body;

            const input: UpdateAtivoInputDTO = {
                id,
                nome,
                valorAtual,
                clientId
            };

            const output: UpdateAtivoOutputDTO = await this.updateAtivoService.execute(input);
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

    private present(input: UpdateAtivoOutputDTO): UpdateAtivoResponseDto {
        return {
            ativos: input.ativo
        };
    }
}
