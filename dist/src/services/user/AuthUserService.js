"use strict";
// ====== TELA DE LOGIN PARA ENTRAR NO SISTEMA (AUTENTICAÇÃO) ======
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
// =============== AQUI É AONDE É FEITO A LOGICA ============================
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs"); // serve para verificar se a senha que o user mandou esta correta, pois ela esta criptografada 
const jsonwebtoken_1 = require("jsonwebtoken"); // serve para autenticar os usuarios, forma segura, gerar um token,  yarn add jsonwebtoken
class AuthUserService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(email);
            // Verificar se o email existe 
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            // Se nao existir esse user 
            if (!user) {
                throw new Error('User/password incorrect');
            }
            // preciso verificar se a senha que ele mandou está correta, com isso essa variavel vai verificar no meu banco se a senha colocada esta correta 
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            //Com isso vou fazer a verificação se a senha que esta tentado logar esta correta
            if (!passwordMatch) {
                throw new Error('User/password incorrect');
            }
            //Se fez todas as verificações e esta correto, hora de entrar no sistema
            // gerar um token JWT e devolver os dados do usario como id, name e email 
            // =========== JWT =================
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email
            }, 
            // Criei o token "muzy1002" la no env ou tambem conhecido como variavel de ambiente
            // nesse caso eu preciso passar o nome da variavel que coloquei la, nao a senha toda, no caso foi JWT_SECRET
            process.env.JWT_SECRET, // buscando a chave la no env 
            {
                subject: user.id,
                expiresIn: '30d' // vai expirar em 30 dias 
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
