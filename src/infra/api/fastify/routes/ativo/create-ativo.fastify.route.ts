import { FastifyInstance } from "fastify";
import {HttpMethod, Route} from "@/infra/api/fastify/routes/route";
import {CreateAtivoUseCase} from "@/usecases/ativo/create-ativo/create-ativos.usecase";
import {FinancaAtivo} from "@/domain/ativos/entities/Ativo";
import {z} from "zod";

export class CreateFinancialAssetRoute implements Route {
    constructor(private readonly usecase: CreateAtivoUseCase) {}

    public static create(usecase: CreateAtivoUseCase) {
        return new CreateFinancialAssetRoute(usecase);
    }

    public getPath() {
        return "/ativos";
    }

     public getMethod(): HttpMethod {
        return "post";
    }

    public getHandler() {
        return async (request:any, reply:any) => {
            const bodySchema = z.object({
                nome: z.string().min(1, "Nome é obrigatório"),
                valorAtual: z.number().positive("Valor atual deve ser positivo"),
                clientId: z.string().uuid("clientId deve ser um UUID válido"),
            });

            const body = bodySchema.safeParse(request.body);

            if (!body.success) {
                return reply.status(400).send({ error: body.error.format() });
            }

            const { nome, valorAtual, clientId } = body.data;

            const ativo = FinancaAtivo.create(nome, valorAtual, clientId);

            await this.usecase.execute(ativo);

            return reply.status(201).send({ message: "Ativo criado com sucesso!" });
        };
    }

    public register(app: FastifyInstance): void {
        app[this.getMethod().toLowerCase() as "post"](this.getPath(), this.getHandler());
    }
}
