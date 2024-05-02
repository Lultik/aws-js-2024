import { middyfy } from "@libs/lambda";
import { createProduct } from "@services/createProduct/createProduct";
import { ValidatedAPIGatewayProxyEvent } from "@libs/api-gateway";
import { AvailableProduct } from "@models/Product";

export const main = middyfy((event: ValidatedAPIGatewayProxyEvent<AvailableProduct>) => createProduct(event.body));
