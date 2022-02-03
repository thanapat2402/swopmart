import { FastifyRequest } from "fastify";

export type ProductBodyRequest = FastifyRequest<{
  Body: {
    name: string;
    price: string;
    quality: string;
    status: string;
  };
}>;

export type ProductParam = FastifyRequest<{
  Params: {
    id: string;
  };
}>;

export type ProductWithRequestBodyAndParam = ProductBodyRequest & ProductParam;
