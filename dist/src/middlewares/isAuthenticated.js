"use strict";
//----------- PARTE DE AUTENTICAÇÃO DO USUARIO PARA ACESSAR ROTA PRIVADA, SÓ ACESSA SE TIVER O TOKEN --------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    // Quando for fazer uma rota privada, eu quero receber o TOKEN
    const authToken = req.headers.authorization;
    // Se ele nao mandou o TOKEN, ja vai ser barrado, retorna um erro
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    //validar o token
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // Recuperar o ID do token e colocar dentro  de uma variavel user_id dentro do req
        req.user_id = sub;
        // se tudo tiver OK, ele vai prosseguir, caso contrario vai cair no catch
        return next();
        // Se cair no catch é pq alguma coisa deu errado, tem que barrar o usuario 
    }
    catch (err) {
        return res.status(401).end();
    }
}
exports.isAuthenticated = isAuthenticated;
