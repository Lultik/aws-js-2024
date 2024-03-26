import { middyfy } from "@libs/lambda";
import { getProductsList } from '@services/getProductsList/getProductsList'

export const main = middyfy(getProductsList);
