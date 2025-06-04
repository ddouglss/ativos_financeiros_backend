"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancaAtivo = void 0;
const crypto = __importStar(require("node:crypto"));
class FinancaAtivo {
    constructor(_props) {
        this._props = _props;
    }
    static create(nome, valorAtual, clientId) {
        const props = {
            id: crypto.randomUUID(),
            nome,
            valorAtual,
            clientId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return new FinancaAtivo(props);
    }
    static with(props) {
        return FinancaAtivo.with(props);
    }
    get id() {
        return this._props.id;
    }
    get nome() {
        return this._props.nome;
    }
    get valorAtual() {
        return this._props.valorAtual;
    }
    get clientId() {
        return this._props.clientId;
    }
    get createdAt() {
        return this._props.createdAt;
    }
    get updatedAt() {
        return this._props.updatedAt;
    }
    toObject() {
        return { ...this._props };
    }
}
exports.FinancaAtivo = FinancaAtivo;
