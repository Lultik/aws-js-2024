import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent, Callback, Context } from "aws-lambda";

export const basicAuthorizer = (event: APIGatewayTokenAuthorizerEvent, _context: Context, callback: Callback<APIGatewayAuthorizerResult>) => {

  if (event.type !== 'TOKEN') {
    callback('Unauthorized');
  }

  try {
    const authorizationToken = event.authorizationToken;
    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const [username, password] = buff.toString('utf-8').split(':');

    console.log(`username: ${username}, password: ${password}`);

    const storedUserPassword = process.env[username];
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    callback(null, policy);
  } catch (e) {
    callback(`Unauthorized: ${e.message}`);
  }
}

const generatePolicy = (principalId: string, resource: string, effect = 'Deny'): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  };
};
