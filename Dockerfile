# Etapa de build
FROM node:18-alpine AS build
WORKDIR /build

# Instalar dependências necessárias para o build (como prisma, se usar binary engine)
RUN apk add --no-cache python3 make g++

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências (incluindo Prisma Client)
RUN npm install

# Copiar o restante do código-fonte
COPY . .

# Gerar Prisma Client
RUN npm run generate

# Build da aplicação (exemplo: tsc, next build, etc)
RUN npm run build


# Etapa final de execução
FROM node:18-alpine
WORKDIR /app

# Instalar bash para o wait-for-it.sh
RUN apk add --no-cache bash

# Copiar script wait-for-it.sh
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Copiar artefatos da build
COPY --from=build /build/dist ./dist
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package*.json ./
COPY --from=build /build/prisma ./prisma

# Expor a porta usada pela aplicação
EXPOSE 3001

# Comando para aguardar o banco e iniciar o backend
CMD ["/usr/local/bin/wait-for-it.sh", "db:3306", "--", "node", "dist/server.js"]
