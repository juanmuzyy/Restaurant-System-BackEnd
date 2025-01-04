
// =============== AQUI É AONDE É FEITO A LOGICA ============================

import prismaClient from "../../prisma";

class DetailUserServices{
    async execute(user_id: string){

        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            //apenas o que eu quero devolver
            select: {
                id:true,
                name: true,
                email: true,
                
            }
        })
        return user
    }
}

export{DetailUserServices}