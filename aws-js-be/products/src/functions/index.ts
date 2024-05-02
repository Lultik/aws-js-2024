import { default as getProductsList } from './getProductsList';
import { default as getProductsById } from './getProductsById';
import { default as createProduct } from './createProduct';
import { default as catalogBatchProcess } from './catalogBatchProcess';
import { default as seedDatabase } from './seedDatabase';

export const functions = {
  getProductsList,
  getProductsById,
  createProduct,
  catalogBatchProcess,

  seedDatabase,
}
