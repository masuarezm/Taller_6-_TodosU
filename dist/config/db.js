"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'msmm@urici0',
    database: 'ProyectoU', // Cambia por el nombre de tu base de datos
};
// Crea la conexión a la base de datos
const db = promise_1.default.createPool(dbConfig);
exports.default = db;
