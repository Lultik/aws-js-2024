import { middyfy } from '@libs/lambda';
import { importProductsFile } from "@services/index";

export const main = middyfy(importProductsFile);
