// Caminnho para que seja DELETADO UM ITEM 

import prismaClient from "../../prisma";

interface ItemRequest{
    item_id: string;
}


class RemoveItemService{
    async execute({item_id}: ItemRequest){

        const order = await prismaClient.item.delete({ // prismaCliente = para acessar o banco. item = para escolher qual pasta do meu banco. delete = para deletar 
            where:{ // o WHERE serve para onde eu quero selecionar onde eu quero excluir
                id: item_id // id do item a ser deletado 
            }
        })

        return order 
    }
}

export {RemoveItemService}