import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { AvailableProduct } from "@models/index";
import { dynamoDB } from "@dynamodb/index";
import { CreateProductBodySchema } from "../../schemas/CreatePostBody.schema";

export const createProduct: ValidatedEventAPIGatewayProxyEvent<AvailableProduct> = async (event) => {
  console.log(event);
  try {
    const {error, value} = CreateProductBodySchema.validate(event.body)

    if (error) {
      return formatJSONResponse._400(error.details.map((err) => err.message).join(', '))
    }

    const {count = 0, ...product} = value
    const id = uuidv4();

    const createProductCommand = new PutCommand({
      TableName: process.env.PRODUCTS_TABLE,
      Item: {
        id,
        ...product,
      },
    });
    const createStockCommand = new PutCommand({
      TableName: process.env.STOCK_TABLE,
      Item: {
        id,
        count,
      },
    });
    await dynamoDB.send(createProductCommand);
    await dynamoDB.send(createStockCommand);

    return formatJSONResponse._200({id, count, ...product});
  } catch (err) {
    return formatJSONResponse._500(err);
  }
};
