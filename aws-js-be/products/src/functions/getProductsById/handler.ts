import { findProductById } from "@services/getProductsById/findProductById";
import { middyfy } from "@libs/lambda";

export const main = middyfy(findProductById);
