"use strict";
// controllers/category/ListByCategoryController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByCategoryController = void 0;
const ListByCategoryService_1 = require("../../services/product/ListByCategoryService");
class ListByCategoryController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category_id = req.query.category_id; // Pega o category_id da query string
            // Caso não passe o category_id na requisição, retorne um erro
            if (!category_id) {
                return res.status(400).json({ error: "Category ID is required" });
            }
            const listByCategory = new ListByCategoryService_1.ListByCategoryService(); // Instância do serviço
            try {
                // Chama o serviço para listar os produtos com o category_id
                const products = yield listByCategory.execute({ category_id });
                return res.json(products); // Retorna os produtos encontrados
            }
            catch (error) {
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.ListByCategoryController = ListByCategoryController;
