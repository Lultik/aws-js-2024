import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { S3Event } from "aws-lambda/trigger/s3";
import { moveParsedFile } from "@services/importFileParser/moveParsedFile";
import { sqsClient } from "../../sqs";

const csv = require('csv-parser');

export const importFileParser = async (event: S3Event) => {
  console.log(JSON.stringify(event));
  const client = new S3Client({region: 'eu-central-1'});

  const [s3Record] = event?.Records;
  const key = decodeURIComponent(s3Record.s3.object.key.replace(/\+/g, ' '));

  const commandParams = {Bucket: process.env.S3_BUCKET_NAME, Key: key}
  const getCommand = new GetObjectCommand(commandParams);

  try {
    const data = await client.send(getCommand);

    await data.Body.pipe(csv())
      .on('data', async (row) => {
        const params = {
          QueueUrl: process.env.SQS_URL,
          MessageBody: JSON.stringify(row),
        };
        await sqsClient.send(new SendMessageCommand(params));
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      });

    await moveParsedFile({s3Record, key, client});

  } catch (err) {
    console.error(err);
  }
}
