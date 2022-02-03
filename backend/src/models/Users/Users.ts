import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { userSchema } from "../../types/models/Users";
import Users, { UserSchemaWithDocument } from "./schema";
import customError from "../../utils/custom-error";
import authError from "../../errors/auth";
import config from "../../config";
import { AuthLoginBodyResponse } from "../../types/handlers/auth";

const generateHashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const comparePassword = (password: string, existsPassword: string): boolean => {
  const isPasswordCorrect = bcrypt.compareSync(password, existsPassword);
  if (!isPasswordCorrect) {
    customError(authError.AuthInvalidPassword);
  }
  return true;
};

const generateAccessToken = (userID: string): string => {
  const token = jwt.sign({}, config.secret.accessToken, {
    expiresIn: 600,
    audience: String(userID),
  });
  return token;
};

const mapUserResponseObject = (
  userID: string,
  user: UserSchemaWithDocument,
  accessToken?: string
): AuthLoginBodyResponse => {
  const response: AuthLoginBodyResponse = {
    id: userID,
    name: user.name || "",
    surname: user.surname || "",
    email: user.email,
    accessToken,
  };

  return response;
};
export const createNewUser = async (
  doc: userSchema
): Promise<UserSchemaWithDocument> => {
  doc.password = generateHashPassword(doc.password);
  const user = new Users(doc);
  return user.save();
};
export const userLogin = async (
  email: string,
  password: string
): Promise<AuthLoginBodyResponse> => {
  const user = await Users.findOne({
    email,
  });
  if (!user) {
    return customError({
      ...authError.AuthInvalidUsername,
      data: {
        testModeAgain: true,
      },
    });
  }
  comparePassword(password, user.password);

  const userID = user._id;
  const accessToken = generateAccessToken(userID);
  const response: AuthLoginBodyResponse = mapUserResponseObject(
    userID,
    user,
    accessToken
  );

  return response;
};
export const getUserByID = async (
  userID: string
): Promise<AuthLoginBodyResponse> => {
  const user = await Users.findById(userID);
  if (!user) {
    return customError(authError.AuthJWTError);
  }
  const response: AuthLoginBodyResponse = mapUserResponseObject(userID, user);

  return response;
};
export default { createNewUser, userLogin, getUserByID, generateAccessToken };
