import { Schema, Document, model } from "mongoose";
import { userSchema } from "../../types/models/Users";

const collection = "Users";
export interface UserSchemaWithDocument extends userSchema, Document {
  // add more field
}
const userSchema = new Schema<UserSchemaWithDocument>(
  {
    email: {
      type: "string",
      unique: true,
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    surname: {
      type: "string",
      required: true,
    },
  },
  {
    collection,
    versionKey: false,
    timestamps: true,
  }
);

export default model(collection, userSchema);
