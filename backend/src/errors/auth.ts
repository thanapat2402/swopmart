import { CustomErrorParams } from "../utils/custom-error";

export const AuthInvalidUsername: CustomErrorParams = {
  message: "Invalid Email",
  code: "AUTH001",
  statusCode: 401,
  data: {
    testMode: true,
  },
};

export const AuthInvalidPassword: CustomErrorParams = {
  message: "Invalid Password",
  code: "AUTH002",
  statusCode: 401,
};

export const AuthMissingHeaders: CustomErrorParams = {
  message: "Unauthorized",
  code: "AUTH003",
  statusCode: 401,
};

export const AuthJWTError: CustomErrorParams = {
  message: "Unauthorized",
  code: "AUTH004",
  statusCode: 401,
};
export default {
  AuthInvalidUsername,
  AuthInvalidPassword,
  AuthMissingHeaders,
  AuthJWTError,
};
