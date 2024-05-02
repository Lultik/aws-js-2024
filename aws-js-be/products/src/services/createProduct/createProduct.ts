import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

import { formatJSONResponse } from "@libs/api-gateway";
import { AvailableProduct } from "@models/index";
import { dynamoDB } from "@dynamodb/index";
import { CreateProductBodySchema } from "../../schemas/CreatePostBody.schema";

export const createProduct = async (body?: AvailableProduct) => {
  try {
    const {error, value} = CreateProductBodySchema.validate(body)

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

    return formatJSONResponse._201({id, count, ...product});
  } catch (err) {
    return formatJSONResponse._500(err);
  }
};
