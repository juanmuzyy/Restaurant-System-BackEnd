
///==== AQUI É AONDE É FEITO A ROTA DO BACKEND ===== // 

import {Router} from "express";
import  multer  from "multer";


import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated"; // estou importando o arquivo na qual criei um middleware para minha rota privada

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";

import uploadConfig from './config/multer' // importando a rota das imagens 
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";

const router = Router();

const upload = multer({ storage: uploadConfig.upload("./tmp") }); // Passando a configuração de armazenamento para o multer // caminho da pasta onde quero que seja salvo as fotos 

// ============  ROTAS DE LOGIN ================ 


// == ROTAS USER NOVO==
router.post('/users', new CreateUserController().handle)

// == ROTAS LOGIN ==
router.post('/session', new AuthUserController().handle)

// == ROTAS Detalhes ==
// Get para buscar as info do usuario 
router.get('/me', isAuthenticated,  new DetailUserController().handle)// o middleware(isAuthenticated, dentro dessa pasta foi criado toda uma autenticação), serve para a rota ser privada, se o usuario tiver login é utorização, vai conseguir acessar a rota

// ============  ROTAS DE CATEGORY  ================ 

// == CRIANDO CATEGORY ==
router.post('/category', isAuthenticated, new CreateCategoryController().handle)


// ==  LISTANDO CATEGORY ==

router.get('/category', isAuthenticated, new ListCategoryController().handle)


// ============  ROTAS DE PRODUCT ================ 

//router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle) // ao criar o produto tem a póssibilidade de colocar uma img por conta do
router.post('/product', isAuthenticated, new CreateProductController().handle) // ao criar o produto tem a póssibilidade de colocar uma img por conta do

router.get('./category/product', isAuthenticated, new ListByCategoryController().handle)


// ============  ROTAS DE ORDER ================ 

router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle) //adicionar algo na order
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle) // deletar algo da mesa 
router.put('/order/send', isAuthenticated, new SendOrderController().handle) // para atualizar algo
router.get('/orders', isAuthenticated, new ListOrdersController().handle) // colocar os pedidos em ordem 
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle) // saber os detalhes de uma mesa o que tem de pedido 
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export {router};

