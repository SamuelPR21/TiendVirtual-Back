import * as productService from "../service/product.service.js";
import { ProductListRequest } from "../DTOs/Product/productListRequest.js";

// [ ] GET → Listar todos
export const getProducts = async (req, res) => {
  try {
    const dto = new ProductListRequest(req.query);
    const result = await productService.getProducts(dto);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error listando productos", error: err.message });
  }
};

// [ ] GET → Filtrar por animal
export const getProductsByAnimal = async (req, res) => {
  try {
    const { animal } = req.params;
    const result = await productService.getProductsByAnimal(animal);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error filtrando productos", error: err.message });
  }
};

// [ ] GET → Listar por id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getProductById(id);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error obteniendo producto", error: err.message });
  }
};
