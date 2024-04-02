import { CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";


export const moveParsedFile = async ({s3Record, key, client}) => {
  try {
    const copyParams = {
      Bucket: s3Record.s3.bucket.name,
      CopySource: `${s3Record.s3.bucket.name}/${key}`,
      Key: s3Record.s3.object.key.replace('uploaded', 'parsed')
    }
    const copyCommand = new CopyObjectCommand(copyParams);
    await client.send(copyCommand);
    console.log(`File copied to ${copyParams.Bucket}/${copyParams.Key}`);


    const deleteParams = {
      Bucket: s3Record.s3.bucket.name,
      Key: key,
    };
    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await client.send(deleteCommand);

    console.log(`File deleted from ${copyParams.CopySource}`);
  } catch (error) {
    console.error(`Error moving file: ${error}`);
  }
}
