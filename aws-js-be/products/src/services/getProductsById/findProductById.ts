import { AvailableProduct } from "@models/Product";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { dynamoDB } from "@dynamodb/dynamodb";
import * as process from "process";

export const findProductById: ValidatedEventAPIGatewayProxyEvent<AvailableProduct> = async (event) => {
  try {
    const getProductCommand = new GetCommand({
      TableName: process.env.PRODUCTS_TABLE,
      Key: {
        id: event.pathParameters.id
      }
    });

    const getCountCommand = new GetCommand({
      TableName: process.env.STOCK_TABLE,
      Key: {
        id: event.pathParameters.id
      }
    });

    const {Item: product} = await dynamoDB.send(getProductCommand);
    const {Item: stock} = await dynamoDB.send(getCountCommand);

    if (!product) {
      return formatJSONResponse._404(`Product with ID ${event.pathParameters.id} not found`);
    }
    if (!stock) {
      return formatJSONResponse._404('Information about count not found');
    }

    return formatJSONResponse._200({...product, ...stock});
  } catch (err: unknown) {
    return formatJSONResponse._500(err);
  }
}
