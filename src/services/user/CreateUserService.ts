
// ======= CRIANDO USUARIOS NO BANCO DE DADOS ======= 

// =============== AQUI É AONDE É FEITO A LOGICA ============================

import prismaClient from "../../prisma"
import { hash } from "bcryptjs" ///serve para cripitografar as senhas, sendo instalado atraves do yarn add bcryptjs


//Quando alguem for usar esse Serviço, vai chamar o UserRequest 
interface UserRequest{
    name: string,
    email: string,
    password: string,


}
class CreateUserServices{
    async execute({name, email, password}: UserRequest){
        console.log(name);

         // ============ O QUE FAZER ENTÃO AGORA???? =========================
          
         
         //  ======= 1° VERIFICAR SE ELE ENVIOU UM EMAIL ============= 
        if (!email){
            throw new Error('Email incorrect')
        }

        // ======= 2° VERIFICAR SE ESSE EMAIL JA ESTA CADASTRADO =============

       // userTeste.findFirst BUSCA ALGUM ITEM, NO CASO O PRIMEIRO QUE ELE ENCONTRAR
        const userAlreadyExists = await prismaClient.userTeste.findFirst({
            where:{ // ele ta buscando no banco algum email, se for igual a esse que estou tentando cadastrar vai colocar dentro dessa variavel userAlreadyExists
                email: email 
            }
        })

        if(userAlreadyExists){
            throw new Error('Email already exists')
        }

        
        // ======= 2° CADASTRANDO USUARIO NO BANCO DE DADOS  =============
        

        const passwordHash = await hash(password, 8) // nessa variavel criei a criptografia da senha e importei para a linha 53 criptografar a senha no banco 


        const user = await prismaClient.userTeste.create({
            data:{
                name: name,
                email: email,
                password: passwordHash, 
            }, 
            // SELECT serve para devolver o que eu quero informar APENAS
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export {CreateUserServices}