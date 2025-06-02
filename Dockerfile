# Etapa de build
FROM node:18-alpine AS build
WORKDIR /build

# Instalar dependências necessárias para o build
RUN apk add --no-cache python3 make g++

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm install

# Copiar resto do código
COPY . .

# Gerar cliente Prisma e fazer build
RUN npm run generate
RUN npm run build

# Etapa de execução
FROM node:18-alpine
WORKDIR /app

# Copiar arquivos necessários da etapa de build
COPY --from=build /build/dist ./dist
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package*.json ./
COPY --from=build /build/prisma ./prisma

# Expor porta da aplicação
EXPOSE 3000

# Configurar comando de inicialização
CMD ["npm", "run", "start"]