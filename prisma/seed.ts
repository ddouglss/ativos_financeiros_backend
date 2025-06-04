import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Criando clientes fictícios
    const cliente1 = await prisma.cliente.create({
        data: {
            nome: "João da Silva",
            email: "joao@example.com",
            ativos: {
                create: [
                    {
                        nome: "Ação XPTO",
                        valorAtual: 150.50,
                    },
                    {
                        nome: "Fundo Imobiliário ABC",
                        valorAtual: 200.00,
                    },
                ]
            }
        }
    });

    const cliente2 = await prisma.cliente.create({
        data: {
            nome: "Maria Oliveira",
            email: "maria@example.com",
            ativos: {
                create: [
                    {
                        nome: "Tesouro Direto",
                        valorAtual: 1000.00,
                    }
                ]
            }
        }
    });

    console.log("Dados inseridos com sucesso!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
