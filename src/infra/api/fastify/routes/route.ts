import type {FastifyRequest, FastifyReply, RouteGenericInterface} from "fastify";

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export const HttpMethod = {
    GET: 'get' as HttpMethod,
    POST: 'post' as HttpMethod,
    PUT: 'put' as HttpMethod,
    DELETE: 'delete' as HttpMethod,
} as const;

export interface Route<T extends RouteGenericInterface = any> {
    getHandler(): (request: FastifyRequest<T>, reply: FastifyReply) => Promise<void>;
    getMethod(): HttpMethod;
    getPath(): string;
}
