"use strict";
// ======= CRIANDO USUARIOS NO BANCO DE DADOS ======= 
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
exports.CreateUserServices = void 0;
// =============== AQUI É AONDE É FEITO A LOGICA ============================
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs"); ///serve para cripitografar as senhas, sendo instalado atraves do yarn add bcryptjs
class CreateUserServices {
    execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(name);
            // ============ O QUE FAZER ENTÃO AGORA???? =========================
            //  ======= 1° VERIFICAR SE ELE ENVIOU UM EMAIL ============= 
            if (!email) {
                throw new Error('Email incorrect');
            }
            // ======= 2° VERIFICAR SE ESSE EMAIL JA ESTA CADASTRADO =============
            // userTeste.findFirst BUSCA ALGUM ITEM, NO CASO O PRIMEIRO QUE ELE ENCONTRAR
            const userAlreadyExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlreadyExists) {
                throw new Error('Email already exists');
            }
            // ======= 2° CADASTRANDO USUARIO NO BANCO DE DADOS  =============
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8); // nessa variavel criei a criptografia da senha e importei para a linha 53 criptografar a senha no banco 
            const user = yield prisma_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                },
                // SELECT serve para devolver o que eu quero informar APENAS
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            return user;
        });
    }
}
exports.CreateUserServices = CreateUserServices;
