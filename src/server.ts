import Fastify from 'fastify';
import cors from '@fastify/cors';
import { clienteRoutes } from '@/http/routes/clienteRoutes';
import { ativoRoutes } from '@/http/routes/ativoRoutes';

const app = Fastify();

app.register(cors);
app.register(clienteRoutes);
app.register(ativoRoutes);

app.listen({ port: 3000, host: '0.0.0.0' }, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
