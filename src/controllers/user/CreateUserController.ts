 //O Controller vai receber diretamente nossa requisição, é com ele que vamos pegar os parametros da requisição, chamar o serviço repassando os dados necessarios 

 import { Request, response, Response } from "express";
 import { CreateUserServices } from "../../services/user/CreateUserService"; 
 class CreateUserController{
    async handle(req:Request, res: Response) {
        const {name, email, password} = req.body;

        const createUserService = new CreateUserServices();

         const user = await createUserService.execute({
            name,
            email,
            password
         });

        return res.json(user)
    }
 }

 export {CreateUserController}