"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClienteRoute = void 0;
const route_1 = require("@/infra/api/fastify/routes/route");
class ListClienteRoute {
    constructor(path, method, listClienteService) {
        this.path = path;
        this.method = method;
        this.listClienteService = listClienteService;
    }
    static create(listClienteService) {
        return new ListClienteRoute("/clientes", route_1.HttpMethod.GET, listClienteService);
    }
    getHandler() {
        return async (request, reply) => {
            const output = await this.listClienteService.execute();
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
            clientes: input.cliente.map(cliente => ({
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email,
                status: cliente.status
            }))
        };
    }
}
exports.ListClienteRoute = ListClienteRoute;
