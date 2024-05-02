export const sqs = {
  catalogItemsQueue: {
    Type: 'AWS::SQS::Queue',
    Properties: {
      QueueName: 'catalogItemsQueue',
    },
  },
}
