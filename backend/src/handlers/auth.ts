import {
  AuthLoginBodyRequest,
  AuthRegisterBodyRequest,
  AuthLoginBodyResponse,
  AuthRefreshTokenResponse,
} from "../types/handlers/auth";
import Users from "../models/Users/Users";
import { UserSchemaWithDocument } from "../models/Users/schema";
import { FastifyRequest } from "fastify";
import customError from "../utils/custom-error";
import { AuthJWTError } from "../errors/auth";

export const handleLogin = async (
  request: AuthLoginBodyRequest
): Promise<AuthLoginBodyResponse> => {
  const { email, password } = request.body;
  const user = await Users.userLogin(email, password);
  return user;
};
export const handleRegister = async (
  request: AuthRegisterBodyRequest
): Promise<UserSchemaWithDocument> => {
  const { email, password, name, surname } = request.body;
  const user = await Users.createNewUser({
    email,
    password,
    name,
    surname,
  });
  return user;
};
export const handleRefreshToken = async (
  request: FastifyRequest
): Promise<AuthRefreshTokenResponse> => {
  const { userID } = request;

  if (!userID) {
    return customError(AuthJWTError);
  }

  const accessToken = Users.generateAccessToken(userID);

  const response: AuthRefreshTokenResponse = {
    accessToken,
  };
  return response;
};

export default { handleLogin, handleRegister, handleRefreshToken };
