"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClienteRoute = void 0;
const route_1 = require("@/infra/api/fastify/routes/route");
class CreateClienteRoute {
    constructor(path, method, createClienteService) {
        this.path = path;
        this.method = method;
        this.createClienteService = createClienteService;
    }
    static create(createClienteService) {
        return new CreateClienteRoute("/clientes", route_1.HttpMethod.POST, createClienteService);
    }
    getHandler() {
        return async (request, reply) => {
            const { nome, email, status } = request.body;
            const input = {
                nome,
                email,
                status
            };
            const output = await this.createClienteService.execute(input);
            reply.code(201).send(this.presentOutput(output));
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    presentOutput(input) {
        return { id: input.id };
    }
}
exports.CreateClienteRoute = CreateClienteRoute;
