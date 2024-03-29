import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { AvailableProduct, Product } from "@models/index";
import { dynamoDB } from "@dynamodb/index";

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<AvailableProduct[]> = async () => {
  try {
    const getCommand = new ScanCommand({
      TableName: process.env.PRODUCTS_TABLE,
      ConsistentRead: true,
    });
    const {Items} = await dynamoDB.send(getCommand);

    const products: AvailableProduct[] = await Promise.all(Items.map(async (product: Product): Promise<AvailableProduct> => {
      const getCountCommand = new GetCommand({
        TableName: process.env.STOCK_TABLE,
        Key: {
          id: product.id
        }
      });
      const {Item: stock} = await dynamoDB.send(getCountCommand);
      return {...product, ...stock} as AvailableProduct;
    }))

    return formatJSONResponse._200(products);
  } catch (err) {
    return formatJSONResponse._500(err)
  }
};
