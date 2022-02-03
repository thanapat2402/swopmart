import fastify, { FastifyServerOptions } from "fastify";
import authRouters from "./routers/auth";
import userRouters from "./routers/user";
import productRouters from "./routers/product";
import { CustomError } from "./utils/custom-error";
import fastifyCors from "fastify-cors";

declare module "fastify" {
  interface FastifyRequest {
    userID?: string;
  }
}

const buildApp = (options: FastifyServerOptions) => {
  const app = fastify(options);

  app.register(fastifyCors);
  app.get("/", async () => "ok");
  app.register(authRouters, { prefix: "/auth" });
  app.register(userRouters, { prefix: "/users" });
  app.register(productRouters, { prefix: "/products" });

  app.setErrorHandler((error, request, reply) => {
    const customError: CustomError = error;
    reply.status(customError.statusCode || 500).send({
      error: {
        message: customError.message,
        code: customError.code,
        data: customError.data,
      },
    });
  });
  return app;
};

export default buildApp;
