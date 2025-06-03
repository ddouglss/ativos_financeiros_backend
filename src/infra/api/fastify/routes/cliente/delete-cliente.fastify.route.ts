import { HttpMethod, Route } from "@/infra/api/fastify/routes/route";
import { DeleteClienteUsecase } from "@/usecases/client/delete-client/delete-cliente.usecase";
import { FastifyReply, FastifyRequest } from "fastify";

export class DeleteClienteRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly deleteClienteService: DeleteClienteUsecase
    ) {}

    public static create(deleteClienteService: DeleteClienteUsecase): DeleteClienteRoute {
        return new DeleteClienteRoute("/clientes/:id", HttpMethod.DELETE, deleteClienteService);
    }

    public getHandler() {
        return async (request: FastifyRequest<{ Params: { id : string } }>, reply: FastifyReply) => {
            const { id } = request.params;

            try {
                await this.deleteClienteService.execute({id});
                reply.status(204).send();
            } catch (error) {
                reply.status(404).send({ message: "Cliente não encontrado" });
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
