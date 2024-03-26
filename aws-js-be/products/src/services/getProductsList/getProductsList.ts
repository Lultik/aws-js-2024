import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { formatJSONResponse, internalError, ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { Product } from "@models/index";
import { dynamoDB, tables } from "@dynamodb/index";


export const getProductsList: ValidatedEventAPIGatewayProxyEvent<Product> = async () => {
  try {
    const getCommand = new ScanCommand({
      TableName: tables.Products,
      ConsistentRead: true,
    });
    const getResponse = await dynamoDB.send(getCommand);

    return formatJSONResponse(getResponse.Items);
  } catch (err) {
    return internalError(err)
  }
};
