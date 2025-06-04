"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAtivoRoute = void 0;
const route_1 = require("@/infra/api/fastify/routes/route");
class DeleteAtivoRoute {
    constructor(path, method, deleteAtivoService) {
        this.path = path;
        this.method = method;
        this.deleteAtivoService = deleteAtivoService;
    }
    static create(deleteAtivoService) {
        return new DeleteAtivoRoute("/ativos/:id", route_1.HttpMethod.DELETE, deleteAtivoService);
    }
    getHandler() {
        return async (request, reply) => {
            const { id } = request.params;
            try {
                await this.deleteAtivoService.execute({ id });
                reply.status(204).send(); // Sem conteúdo ao deletar
            }
            catch (error) {
                reply.status(404).send({ message: "Ativo não encontrado" });
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
exports.DeleteAtivoRoute = DeleteAtivoRoute;
