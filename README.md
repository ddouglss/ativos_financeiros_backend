# 🧾 Ativos Financeiros - API Fastify

Uma API desenvolvida para um escritório de investimentos, com o objetivo de **gerenciar clientes** e **listar informações básicas sobre ativos financeiros**.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Zod](https://zod.dev/)
- Arquitetura Limpa (Clean Architecture)
- Princípios SOLID

---

## 📋 Funcionalidades

### 📁 Clientes
- ✅ **Criar cliente** (`POST /clientes`)
- ✅ **Listar todos os clientes** (`GET /clientes`)
- ✅ **Editar cliente por ID** (`PUT /clientes/:id`)

### 💹 Ativos Financeiros
- ✅ **Listar ativos fixos** (`GET /ativos`)
  - Exemplo de retorno:
    ```json
    [
      { "nome": "Ação XYZ", "valor": 150.50 },
      { "nome": "Fundo ABC", "valor": 300.75 }
    ]
    ```

---

## 🧱 Arquitetura

Este projeto segue os princípios da **Arquitetura Limpa** e os princípios **SOLID**, com separação clara de responsabilidades:

