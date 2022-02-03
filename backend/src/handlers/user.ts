import { FastifyRequest } from "fastify";
import { AuthJWTError } from "../errors/auth";
import Users from "../models/Users/Users";
import customError from "../utils/custom-error";

export const handleUserMe = async (request: FastifyRequest) => {
  const { userID } = request;

  if (!userID) {
    return customError(AuthJWTError);
  }

  const user = await Users.getUserByID(userID);

  return user;
};

export default {
  handleUserMe,
};
