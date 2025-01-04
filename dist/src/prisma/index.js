"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Depois que importei ele, basta inicializar dessa Forma;
const prismaClient = new client_1.PrismaClient();
exports.default = prismaClient;
