"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastifyApi = void 0;
const fastify_1 = __importDefault(require("fastify"));
class FastifyApi {
    constructor(routes) {
        this.app = (0, fastify_1.default)();
        this.addRoutes(routes);
    }
    static create(routes) {
        return new FastifyApi(routes);
    }
    addRoutes(routes) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            this.app.route({
                method: method.toUpperCase(),
                url: path,
                handler,
            });
        });
    }
    async start(port) {
        try {
            await this.app.listen({ port });
            console.log(`Servidor rodando em http://localhost:${port}`);
            this.listRoutes();
        }
        catch (err) {
            console.error("Erro ao iniciar o servidor:", err);
            process.exit(1);
        }
    }
    listRoutes() {
        // Imprime as rotas registradas no servidor (string formatada)
        const routesInfo = this.app.printRoutes();
        console.log("Rotas registradas:\n", routesInfo);
    }
}
exports.FastifyApi = FastifyApi;
