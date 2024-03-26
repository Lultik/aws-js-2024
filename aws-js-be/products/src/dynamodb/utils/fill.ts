import { BatchWriteCommand, DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient, } from "@aws-sdk/client-dynamodb";
import { readFileSync } from 'fs'
import { chunkArray, tables } from "@dynamodb/index";

const region = "eu-central-1";
process.env.AWS_PROFILE = `aws-js`;

const dynamoDBClient = new DynamoDBClient({region});
const dynamoDB = DynamoDBDocument.from(dynamoDBClient);

const fill = async () => {
  try {
    const productsFile = readFileSync(require('path').resolve(__dirname, './../../mocks/products.json'));
    const products = JSON.parse(productsFile.toString());

    const productChunks = chunkArray(products, 25);
    // For every chunk of 25 products, make one BatchWrite request.
    for (const chunk of productChunks) {
      const putRequests = chunk.map((product) => ({
        PutRequest: {
          Item: product,
        },
      }));

      const command = new BatchWriteCommand({
        RequestItems: {
          [tables.Products]: putRequests,
        },
      });

      await dynamoDB.send(command);
      console.log('Done!')
    }
  } catch (err) {
    console.log('Error', err)
  }
}

fill();
