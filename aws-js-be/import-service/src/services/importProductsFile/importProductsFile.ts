import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { GetObjectCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const importProductsFile: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {
  try {
    const client = new S3Client({region: 'eu-central-1'});
    const fileName = event?.queryStringParameters?.name;

    const commandParams = {Bucket: process.env.S3_BUCKET_NAME, Key: `uploaded/${fileName}`}

    const cmd = new HeadObjectCommand(commandParams);
    await client.send(cmd);

    const command = new GetObjectCommand(commandParams);

    const presignedURL = await getSignedUrl(client, command, {expiresIn: 3600});

    return formatJSONResponse._200({url: presignedURL})
  } catch (err) {
    if (err.$metadata?.httpStatusCode === 403 || err.$metadata?.httpStatusCode === 404) {
      return formatJSONResponse._404('File not found');
    }
    return formatJSONResponse._500('Internal server error')
  }
}
