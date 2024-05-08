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

    const userId =
      Buffer.from(authorizationToken, "base64").toString("ascii").split(":")[0] || "";

    const policy = generatePolicy(encodedCreds, event.methodArn, effect, userId);

    callback(null, policy);
  } catch (e) {
    callback(`Unauthorized: ${e.message}`);
  }
}

const generatePolicy = (principalId: string, resource: string, effect = 'Deny', userId: string): APIGatewayAuthorizerResult => {
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
    },
    // @ts-ignore
    context: {
      userId,
    },
  };
};
