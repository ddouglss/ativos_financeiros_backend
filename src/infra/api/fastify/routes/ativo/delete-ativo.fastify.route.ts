import { HttpMethod, Route } from "@/infra/api/fastify/routes/route";
import { DeleteAtivoUseCase } from "@/usecases/ativo/delete-ativo/delete-ativos.usecase";
import { FastifyReply, FastifyRequest } from "fastify";

export class DeleteAtivoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteAtivoService: DeleteAtivoUseCase
    ) {}

    public static create(deleteAtivoService: DeleteAtivoUseCase): DeleteAtivoRoute {
        return new DeleteAtivoRoute("/ativos/:id", HttpMethod.DELETE, deleteAtivoService);
    }

    public getHandler() {
        return async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
            const { id } = request.params;

            try {
                await this.deleteAtivoService.execute({ id });
                reply.status(204).send();
            } catch (error) {
                reply.status(404).send({ message: "Ativo não encontrado" });
            }
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}
