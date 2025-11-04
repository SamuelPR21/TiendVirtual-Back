import Products from "../models/products.js";
import { ProductResponse } from "../DTOs/Product/productResponse.js";

const toResponse = (product) =>
  new ProductResponse({
    id: product._id,
    name: product.name,
    price_lb: product.price_lb,
    description: product.description,
    stock: product.stock,
    animal: product.animal,
    image_url: product.image_url,
  });

// [ ] GET → Listar todos (con filtro opcional por animal)
export const getProducts = async (dto) => {
  const filter = {};
  if (dto.animal) {
    filter.animal = new RegExp(`^${dto.animal}$`, "i");
  }
  const products = await Products.find(filter).lean();
  return products.map((p) => toResponse(p));
};

// [ ] GET → Filtrar por animal
export const getProductsByAnimal = async (animal) => {
  const products = await Products.find({
    animal: new RegExp(`^${animal}$`, "i"),
  }).lean();
  return products.map((p) => toResponse(p));
};

// [ ] GET → Listar por id
export const getProductById = async (id) => {
  const product = await Products.findById(id).lean();
  if (!product) {
    throw new Error("Producto no encontrado");
  }
  return toResponse(product);
};
