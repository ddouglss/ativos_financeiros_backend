"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ativoRoutes = ativoRoutes;
async function ativoRoutes(app) {
    app.get("/ativos", async () => {
        return [
            { nome: "Ação XYZ", valor: 125.50 },
            { nome: "Fundo ABC", valor: 80.25 },
            { nome: "Tesouro IPCA+", valor: 102.70 },
        ];
    });
}
