export const sns = {
  createProductTopic: {
    Type: 'AWS::SNS::Topic',
    Properties: {
      TopicName: 'createProductTopic',
    }
  },
  ProductSubscriptionProductExists: {
    Type: 'AWS::SNS::Subscription',
    Properties: {
      Protocol: 'email',
      Endpoint: 'vbf22213@ilebi.com',
      TopicArn: {
        Ref: 'createProductTopic',
      },
    },
  },
  ProductSubscriptionProductMiss: {
    Type: 'AWS::SNS::Subscription',
    Properties: {
      Protocol: 'email',
      Endpoint: 'obt52066@fosiq.com',
      TopicArn: {
        Ref: 'createProductTopic',
      },
      FilterPolicy: {
        count: [{'numeric': ['<=', 0]}]
      }
    },
  }
}
