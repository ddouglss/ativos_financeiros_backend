import Fastify, { FastifyInstance } from "fastify";
import { Api } from "../api";
import { Route } from "@/infra/api/fastify/routes/route";

export class FastifyApi implements Api {
    private app: FastifyInstance;

    private constructor(routes: Route[]) {
        this.app = Fastify();
        this.addRoutes(routes);
    }

    public static create(routes: Route[]): FastifyApi {
        return new FastifyApi(routes);
    }

    public addRoutes(routes: Route[]) {
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

    public async start(port: number) {
        try {
            await this.app.listen({ port });
            console.log(`Servidor rodando em http://localhost:${port}`);
            this.listRoutes();
        } catch (err) {
            console.error("Erro ao iniciar o servidor:", err);
            process.exit(1);
        }
    }

    private listRoutes() {
        // Imprime as rotas registradas no servidor (string formatada)
        const routesInfo = this.app.printRoutes();
        console.log("Rotas registradas:\n", routesInfo);
    }
}
