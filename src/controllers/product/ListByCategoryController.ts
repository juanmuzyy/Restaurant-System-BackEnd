// controllers/category/ListByCategoryController.ts

import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string; // Pega o category_id da query string

    // Caso não passe o category_id na requisição, retorne um erro
    if (!category_id) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    const listByCategory = new ListByCategoryService(); // Instância do serviço

    try {
      // Chama o serviço para listar os produtos com o category_id
      const products = await listByCategory.execute({ category_id });

      return res.json(products); // Retorna os produtos encontrados
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { ListByCategoryController };
