import { PutCommand } from "@aws-sdk/lib-dynamodb";
import products from '@mocks/products.json';
import { dynamoDB } from "@dynamodb/dynamodb";
import { formatJSONResponse } from "@libs/api-gateway";

export const seedDatabase = async () => {
  try {

    for (const product of products) {
      const putProductCommand = new PutCommand({
        TableName: process.env.PRODUCTS_TABLE,
        Item: product,
      });
      const putStockCommand = new PutCommand({
        TableName: process.env.STOCK_TABLE,
        Item: {
          id: product.id,
          count: Math.floor(Math.random() * 20) + 1,
        }
      })
      await dynamoDB.send(putProductCommand);
      await dynamoDB.send(putStockCommand);

    }
    return formatJSONResponse({message: 'Done!'})
  } catch (err) {
    console.log('Error', err)
  }
}
