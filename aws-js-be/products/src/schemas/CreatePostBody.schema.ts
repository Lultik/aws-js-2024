import joi from 'joi';
import { CreateProductBody } from "@models/Product";

export const CreateProductBodySchema = joi.object<CreateProductBody>({
  description: joi.string().required(),
  title: joi.string().required(),
  price: joi.number().required(),
  count: joi.number().optional().default(0),
});
