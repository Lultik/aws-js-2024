import { products } from '@mocks/data'
import { Product } from "../../types/Product";
import { formatJSONResponse, internalError, notFound, ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";

export const findProductById: ValidatedEventAPIGatewayProxyEvent<Product> = async (event) => {
  try {
    const product = products.find(({id}) => id === event.pathParameters.id);

    if (!product) {
      return notFound(`Product with ID ${event.pathParameters.id} not found`);
    }

    return formatJSONResponse(product);
  } catch (err: unknown) {
    return internalError(err);
  }
}
