"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFinancialAssetRoute = void 0;
const Ativo_1 = require("@/domain/ativos/entities/Ativo");
const zod_1 = require("zod"); // ajuste se tiver esse tipo
class CreateFinancialAssetRoute {
    constructor(usecase) {
        this.usecase = usecase;
    }
    static create(usecase) {
        return new CreateFinancialAssetRoute(usecase);
    }
    getPath() {
        return "/ativos";
    }
    getMethod() {
        return "post";
    }
    getHandler() {
        return async (request, reply) => {
            const bodySchema = zod_1.z.object({
                nome: zod_1.z.string().min(1, "Nome é obrigatório"),
                valorAtual: zod_1.z.number().positive("Valor atual deve ser positivo"),
                clientId: zod_1.z.string().uuid("clientId deve ser um UUID válido"),
            });
            const body = bodySchema.safeParse(request.body);
            if (!body.success) {
                return reply.status(400).send({ error: body.error.format() });
            }
            const { nome, valorAtual, clientId } = body.data;
            const ativo = Ativo_1.FinancaAtivo.create(nome, valorAtual, clientId);
            await this.usecase.execute(ativo);
            return reply.status(201).send({ message: "Ativo criado com sucesso!" });
        };
    }
    register(app) {
        app[this.getMethod().toLowerCase()](this.getPath(), this.getHandler());
    }
}
exports.CreateFinancialAssetRoute = CreateFinancialAssetRoute;
