"use strict";
///==== AQUI É AONDE É FEITO A ROTA DO BACKEND ===== // 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated"); // estou importando o arquivo na qual criei um middleware para minha rota privada
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const multer_2 = __importDefault(require("./config/multer")); // importando a rota das imagens 
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrdersController_1 = require("./controllers/order/ListOrdersController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)({ storage: multer_2.default.upload("./tmp") }); // Passando a configuração de armazenamento para o multer // caminho da pasta onde quero que seja salvo as fotos 
// ============  ROTAS DE LOGIN ================ 
// == ROTAS USER NOVO==
router.post('/users', new CreateUserController_1.CreateUserController().handle);
// == ROTAS LOGIN ==
router.post('/session', new AuthUserController_1.AuthUserController().handle);
// == ROTAS Detalhes ==
// Get para buscar as info do usuario 
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle); // o middleware(isAuthenticated, dentro dessa pasta foi criado toda uma autenticação), serve para a rota ser privada, se o usuario tiver login é utorização, vai conseguir acessar a rota
// ============  ROTAS DE CATEGORY  ================ 
// == CRIANDO CATEGORY ==
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
// ==  LISTANDO CATEGORY ==
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
// ============  ROTAS DE PRODUCT ================ 
//router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle) // ao criar o produto tem a póssibilidade de colocar uma img por conta do
router.post('/product', isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle); // ao criar o produto tem a póssibilidade de colocar uma img por conta do
router.get('./category/product', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
// ============  ROTAS DE ORDER ================ 
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete('/order', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle); //adicionar algo na order
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle); // deletar algo da mesa 
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle); // para atualizar algo
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle); // colocar os pedidos em ordem 
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle); // saber os detalhes de uma mesa o que tem de pedido 
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
