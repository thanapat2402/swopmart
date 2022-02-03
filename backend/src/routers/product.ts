import { FastifyInstance } from "fastify";
import productHandler from "../handlers/product";
import { verifyAccessToken } from "../hooks/auth";

const productRouters = async (app: FastifyInstance) => {
  const preHandler = [verifyAccessToken];
  app.post<{
    Body: {
      name: string;
      price: string;
      quality: string;
      status: string;
    };
  }>("/add", { preHandler }, productHandler.handlePostCreateNew);
  app.get("/", { preHandler }, productHandler.handleGetProducts);
  //app.get<{
  // Params: { id: string };
  //}>("/:id", { preHandler }, productHandler.handleGetProductByID);
  //app.patch("/:id",{ preHandler },productHandler.handlePatchUpdateProductByID);
  app.delete<{
    Params: { id: string };
  }>("/:id", { preHandler }, productHandler.handleDeleteProductByID);
};
export default productRouters;
