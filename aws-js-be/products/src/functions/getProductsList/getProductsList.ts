import { formatJSONResponse, internalError, ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { Product } from "../../types/Product";
import { products } from "@mocks/data";

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<Product> = async () => {
  try {
    return formatJSONResponse(products);
  } catch (err) {
    return internalError(err)
  }
};
