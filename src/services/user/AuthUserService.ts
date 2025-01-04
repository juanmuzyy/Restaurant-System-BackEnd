

// ====== TELA DE LOGIN PARA ENTRAR NO SISTEMA (AUTENTICAÇÃO) ======

// =============== AQUI É AONDE É FEITO A LOGICA ============================


import prismaClient from "../../prisma";
import { compare } from "bcryptjs"; // serve para verificar se a senha que o user mandou esta correta, pois ela esta criptografada 
import { sign } from "jsonwebtoken"; // serve para autenticar os usuarios, forma segura, gerar um token,  yarn add jsonwebtoken


interface AuthRequest{
    email: string;
    password: string;

}


class AuthUserService{
    async execute({email, password}: AuthRequest){
        console.log(email)

        // Verificar se o email existe 
        const user = await prismaClient.user.findFirst({
            where:{   //ele ta buscando no banco algum email 
                email: email
            }
        })

        // Se nao existir esse user 
        if(!user){
            throw new Error ('User/password incorrect')
        }

        // preciso verificar se a senha que ele mandou está correta, com isso essa variavel vai verificar no meu banco se a senha colocada esta correta 
        const passwordMatch = await compare(password, user.password)

        //Com isso vou fazer a verificação se a senha que esta tentado logar esta correta

        if(!passwordMatch){
            throw new Error('User/password incorrect')
        }

        //Se fez todas as verificações e esta correto, hora de entrar no sistema
        // gerar um token JWT e devolver os dados do usario como id, name e email 


        // =========== JWT =================
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            // Criei o token "muzy1002" la no env ou tambem conhecido como variavel de ambiente
            // nesse caso eu preciso passar o nome da variavel que coloquei la, nao a senha toda, no caso foi JWT_SECRET

            process.env.JWT_SECRET, // buscando a chave la no env 
            {
                subject: user.id,
                expiresIn: '30d' // vai expirar em 30 dias 
            }
        )

        return{
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export {AuthUserService}