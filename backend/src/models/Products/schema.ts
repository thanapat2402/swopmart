import { Schema, Document, model } from "mongoose";

const collection = "Product";

export interface ProductSchema {
  name: string;
  price: string;
  quality: string;
  owner: string;
  status: string;
}
export interface ProductSchemaWithDocument extends ProductSchema, Document {}

const ProductSchema = new Schema<ProductSchemaWithDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quality: {
      type: String,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "deleted"],
    },
  },
  {
    collection,
    versionKey: false,
    timestamps: true,
  }
);

export default model(collection, ProductSchema);
