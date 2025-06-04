"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClienteRoute = void 0;
const route_1 = require("@/infra/api/fastify/routes/route");
class UpdateClienteRoute {
    constructor(path, method, updateClienteService) {
        this.path = path;
        this.method = method;
        this.updateClienteService = updateClienteService;
    }
    static create(updateClienteService) {
        return new UpdateClienteRoute("/clientes/:id", route_1.HttpMethod.PUT, updateClienteService);
    }
    getHandler() {
        return async (request, reply) => {
            const { id } = request.params;
            const { nome, email, status } = request.body;
            const input = {
                id,
                nome,
                email,
                status,
            };
            const output = await this.updateClienteService.execute(input);
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
            clientes: input.cliente
        };
    }
}
exports.UpdateClienteRoute = UpdateClienteRoute;
