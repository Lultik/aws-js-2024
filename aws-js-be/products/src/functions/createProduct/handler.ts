import { middyfy } from "@libs/lambda";
import { createProduct } from "@services/createProduct/createProduct";

export const main = middyfy(createProduct);
