import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { Api } from "../api";
import { Route } from "@/infra/api/fastify/routes/route";

export class FastifyApi implements Api {
    public app: FastifyInstance;

    private constructor(routes: Route[], port: number) {
        this.app = Fastify({ logger: true });
        this.registerCors();
        this.addRoutes(routes);
        this.start(port);
    }

    public static create(routes: Route[], port = 3001): FastifyApi {
        return new FastifyApi(routes, port);
    }

    private async registerCors() {
        await this.app.register(cors, {
            origin: [
                "http://localhost:5000",
                "http://localhost:3000",
                "https://seu-front-deploy.vercel.app",
            ],
            methods: ["get", "post", "put", "delete", "options"],
        });
    }

    public addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.route({
                method: route.getMethod().toUpperCase(),
                url: route.getPath(),
                handler: route.getHandler(),
            });
        });
    }

    public async start(port: number) {
        try {
            await this.app.listen({ port, host: "0.0.0.0" });
            console.log(`Servidor rodando em http://localhost:${port}`);
            this.listRoutes();
        } catch (err) {
            console.error("Erro ao iniciar o servidor:", err);
            process.exit(1);
        }
    }

    private listRoutes() {
        console.log("Rotas registradas:\n", this.app.printRoutes());
    }

    // Caso queira expor o FastifyInstance para registrar rotas adicionais
    public getInstance(): FastifyInstance {
        return this.app;
    }

    public static registerRoutes(
        app: FastifyInstance,
        routes: Route[]
    ): void {
        routes.forEach((route) => {
            app.route({
                method: route.getMethod().toUpperCase(),
                url: route.getPath(),
                handler: route.getHandler(),
            });
        });
    }

}
