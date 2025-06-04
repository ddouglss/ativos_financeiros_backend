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
- ✅ **Deletar clientes por ID (`DELETE/clientes/:id`)

### 💹 Ativos Financeiros
- ✅ **Listar ativos fixos** (`GET /ativos`)
- ✅ **Criar um ativo** (`POST /ativos`)
- ✅ **Editar ativos por ID** (`PUT /ativos/:id`)
- ✅ **Deletar ativos por ID (`Delete/ativos/:id`)
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

```
src/
├── domain/ # Entidades e gateway
├── infra/ # Repositórios e camada de acesso a dados
├── use-cases/ # Casos de uso da aplicação
└── server.ts # Entrada principal da API

```
yaml
Copiar
Editar

---

## 🐳 Como rodar com Docker

### 📦 Pré-requisitos
- Docker e Docker Compose instalados.

### 🔧 Passos:

```bash
# 1. Clonar o repositório

git clone https://github.com/seu-usuario/seu-projeto.git

# 2. Subir o ambiente
docker-compose up --build
A API estará disponível em: http://localhost:3000

🛠 Variáveis de Ambiente
Crie um arquivo .env com a seguinte variável:

````
📘 Documentação das Rotas
Você pode testar as rotas usando ferramentas como Insomnia, Postman ou Thunder Client.

👨‍💻 Autor
Desenvolvido por Douglas Souza Silva
📧 

📄 Licença
Este projeto está sob a licença MIT.

yaml
Copiar
Editar


Se quiser, posso gerar uma versão com os dados do seu GitHub ou incluir instruções extras como testes, deploy, etc. Deseja isso?
