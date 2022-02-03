import { CustomErrorParams } from "../utils/custom-error";

export const ProductIDInvalid: CustomErrorParams = {
  message: "Product ID invalid",
  code: "PDT001",
  statusCode: 400,
  data: {
    testMode: true,
  },
};
export const ProductSomethingWrong: CustomErrorParams = {
  message: "Something went wrong",
  code: "PDT002",
  statusCode: 400,
  data: {
    testMode: true,
  },
};
export const ProductCannotUpdate: CustomErrorParams = {
  message: "Product Cannot Update",
  code: "PDT003",
  statusCode: 400,
  data: {
    testMode: true,
  },
};

export default {
  ProductIDInvalid,
  ProductSomethingWrong,
  ProductCannotUpdate,
};
