import { findProductById } from "./findProductById";
import { middyfy } from "@libs/lambda";

export const main = middyfy(findProductById);
