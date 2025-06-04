"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAtivoRoute = void 0;
const route_1 = require("@/infra/api/fastify/routes/route");
class UpdateAtivoRoute {
    constructor(path, method, updateAtivoService) {
        this.path = path;
        this.method = method;
        this.updateAtivoService = updateAtivoService;
    }
    static create(updateAtivoService) {
        return new UpdateAtivoRoute("/ativos/:id", route_1.HttpMethod.PUT, updateAtivoService);
    }
    getHandler() {
        return async (request, reply) => {
            const { id } = request.params;
            const { nome, valorAtual, clientId } = request.body;
            const input = {
                id,
                nome,
                valorAtual,
                clientId
            };
            const output = await this.updateAtivoService.execute(input);
            const responseBody = this.present(output);
            reply.status(200).send(responseBody);
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    present(input) {
        return {
            ativos: input.ativo
        };
    }
}
exports.UpdateAtivoRoute = UpdateAtivoRoute;
