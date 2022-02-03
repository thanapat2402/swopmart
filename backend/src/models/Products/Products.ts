import customError from "../../utils/custom-error";
import productErrors from "../../errors/product";
import Product, { ProductSchema, ProductSchemaWithDocument } from "./schema";

export type { ProductSchema, ProductSchemaWithDocument };

export const createNewProduct = async (
  doc: ProductSchema
): Promise<ProductSchemaWithDocument> => {
  const article = new Product(doc);

  return article.save();
};

export const getProducts = async (
  condition: object = {}
): Promise<ProductSchema[]> => {
  const articles = Product.find({
    ...condition,
    status: "active",
  }).sort({
    createdAt: -1,
  });

  return articles;
};

export const getProductByID = async (
  productId: string
): Promise<ProductSchema> => {
  try {
    const product = await Product.findOne({
      _id: productId,
      status: "active",
    });

    if (!product) {
      customError(productErrors.ProductIDInvalid);
    }

    return product;
  } catch (error) {
    return customError(productErrors.ProductSomethingWrong);
  }
};

export const updateProductByID = async (
  articleId: string,
  doc: ProductSchema
): Promise<boolean> => {
  try {
    (Object.keys(doc) as (keyof ProductSchema)[]).filter(
      (key) => doc[key] ?? delete doc[key]
    );

    const result = await Product.updateOne(
      {
        _id: articleId,
        status: {
          $ne: "deleted",
        },
      },
      {
        $set: {
          ...doc,
        },
      }
    );
    if (!result.nModified) {
      return customError(productErrors.ProductCannotUpdate);
    }

    return true;
  } catch (error) {
    return customError(productErrors.ProductSomethingWrong);
  }
};

export const softDeleteProductByID = async (
  articleId: string
): Promise<boolean> => {
  try {
    await Product.findByIdAndUpdate(articleId, {
      $set: {
        status: "deleted",
      },
    });

    return true;
  } catch (error) {
    return customError(productErrors.ProductSomethingWrong);
  }
};

export default {
  createNewProduct,
  getProducts,
  getProductByID,
  updateProductByID,
  softDeleteProductByID,
};
