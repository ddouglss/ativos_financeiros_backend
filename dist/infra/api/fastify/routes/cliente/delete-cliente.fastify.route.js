"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClienteRoute = void 0;
const route_1 = require("@/infra/api/fastify/routes/route");
class DeleteClienteRoute {
    constructor(path, method, deleteClienteService) {
        this.path = path;
        this.method = method;
        this.deleteClienteService = deleteClienteService;
    }
    static create(deleteClienteService) {
        return new DeleteClienteRoute("/clientes/:id", route_1.HttpMethod.DELETE, deleteClienteService);
    }
    getHandler() {
        return async (request, reply) => {
            const { id } = request.params;
            try {
                await this.deleteClienteService.execute({ id });
                reply.status(204).send();
            }
            catch (error) {
                reply.status(404).send({ message: "Cliente não encontrado" });
            }
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
}
exports.DeleteClienteRoute = DeleteClienteRoute;
