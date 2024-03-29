import joi from 'joi';
import { AvailableProduct } from "@models/Product";

export const CreateProductBodySchema = joi.object<Omit<AvailableProduct, 'id'>>({
  description: joi.string().required(),
  title: joi.string().required(),
  price: joi.number().required(),
  count: joi.number().optional().default(0),
});
