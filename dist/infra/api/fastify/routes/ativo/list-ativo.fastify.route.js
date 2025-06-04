"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAtivoRoute = void 0;
const route_1 = require("@/infra/api/fastify/routes/route");
class ListAtivoRoute {
    constructor(path, method, listAtivoService) {
        this.path = path;
        this.method = method;
        this.listAtivoService = listAtivoService;
    }
    static create(listAtivoService) {
        return new ListAtivoRoute("/ativos", route_1.HttpMethod.GET, listAtivoService);
    }
    getHandler() {
        return async (request, reply) => {
            const output = await this.listAtivoService.execute();
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
            ativos: input.ativos.map((ativo) => ({
                id: ativo.ativo.id,
                nome: ativo.nome,
                valorAtual: ativo.valorAtual,
                clientId: ativo.clientId
            }))
        };
    }
}
exports.ListAtivoRoute = ListAtivoRoute;
