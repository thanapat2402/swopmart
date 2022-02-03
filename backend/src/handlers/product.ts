import { FastifyRequest } from "fastify";
import Product from "../models/Products";
import {
  ProductSchema,
  ProductSchemaWithDocument,
} from "../models/Products/schema";
import {
  ProductBodyRequest,
  ProductParam,
  ProductWithRequestBodyAndParam,
} from "../types/handlers/product";

export const handlePostCreateNew = async (
  request: ProductBodyRequest
): Promise<ProductSchemaWithDocument> => {
  const { userID } = request;
  const { name, price, quality, status } = request.body;

  console.log(`userId ==>${userID}`);
  const product = await Product.createNewProduct({
    name,
    price,
    quality,
    status: status ?? "active",
    owner: userID as string,
  });

  return product;
};
export const handleGetProducts = async (
  request: FastifyRequest
): Promise<ProductSchema[]> => Product.getProducts();

export const handleGetProductByID = async (
  request: ProductParam
): Promise<ProductSchema> => {
  const { id } = request.params;

  const product = await Product.getProductByID(id);

  return product;
};

export const handlePatchUpdateProductByID = async (
  request: ProductWithRequestBodyAndParam
): Promise<string> => {
  const { userID } = request;
  const { id } = request.params;
  const { name, price, quality, status } = request.body;

  await Product.updateProductByID(id, {
    name,
    price,
    quality,
    status: status ?? "active",
    owner: userID as string,
  });

  return "OK";
};

export const handleDeleteProductByID = async (request: ProductParam) => {
  const { id } = request.params;
  await Product.softDeleteProductByID(id);
  return "OK";
};

export default {
  handleGetProducts,
  handleGetProductByID,
  handlePostCreateNew,
  handlePatchUpdateProductByID,
  handleDeleteProductByID,
};
