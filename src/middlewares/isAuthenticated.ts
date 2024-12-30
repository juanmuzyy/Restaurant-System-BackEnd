

//----------- PARTE DE AUTENTICAÇÃO DO USUARIO PARA ACESSAR ROTA PRIVADA, SÓ ACESSA SE TIVER O TOKEN --------------

import { NextFunction, Request,Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;
}


export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
   

// Quando for fazer uma rota privada, eu quero receber o TOKEN

const authToken = req.headers.authorization;


// Se ele nao mandou o TOKEN, ja vai ser barrado, retorna um erro
if(!authToken){
    return res.status(401).end()
}

const [, token] = authToken.split(" ")


//validar o token
try{
    const {sub} = verify(
        token,
        process.env.JWT_SECRET
    ) as Payload;


    // Recuperar o ID do token e colocar dentro  de uma variavel user_id dentro do req
    req.user_id = sub;

    // se tudo tiver OK, ele vai prosseguir, caso contrario vai cair no catch
    return next();

// Se cair no catch é pq alguma coisa deu errado, tem que barrar o usuario 
}catch(err){
    return res.status(401).end();
}
}