import dynamodb from './resources/dynamodb'
import { sqs } from "./resources/sqs";
import { sns } from "./resources/sns";

export const resources = {
  Resources: {
    ...dynamodb,
    ...sqs,
    ...sns,
  },
}
