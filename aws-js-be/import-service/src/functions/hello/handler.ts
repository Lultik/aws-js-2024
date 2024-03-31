import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const hello: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
  return formatJSONResponse({message: 'hello'});
};

export const main = middyfy(hello);
