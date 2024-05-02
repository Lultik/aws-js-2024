import { middyfy } from '@libs/lambda';
import { basicAuthorizer } from "@services/basicAuthorizer/basicAuthorizer";

export const main = middyfy(basicAuthorizer);
