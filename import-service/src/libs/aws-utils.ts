import * as AWS from "aws-sdk";

const s3Client = new AWS.S3();
const sqsClient = new AWS.SQS();

export const sendSQSMessage = async (data: any) => {
  console.info("[Send SQS Message]: ", { data });
  
  await sqsClient
    .sendMessage(
      {
        QueueUrl: process.env.SQS_URL,
        MessageBody: JSON.stringify(data),
      },
      (error) => {
        if (error) {
          console.error("[Send SQS Message Error]:\n");
          throw error;
        }
      }
    )
    .promise();
}

export const getSignedURL = async (
  bucket: string,
  fileName: string,
  expirySeconds: number
) => {
  return s3Client.getSignedUrl("putObject", {
    Bucket: bucket,
    Key: `${process.env.IMPORT_BUCKET_UPLOAD_PREFIX}${fileName}`,
    Expires: expirySeconds,
    ContentType: "text/csv",
  });
};

export const isFileExist = async (bucket: string, key: string) => {
  console.info("[Is File Exist]: ", { bucket, key });

  let isExist = true;

  try {
    await s3Client
      .headObject({
        Bucket: bucket,
        Key: key,
      })
      .promise();
  } catch (error) {
    if (error.name === "NotFound") {
      isExist = false;
      return;
    }
    console.error("[Is File Exist] Error:\n");
    throw error;
  }

  console.info("[Is File Exist]: ", isExist);
  return isExist;
};

export const getReadStream = async (bucket: string, key: string) => {
  console.info("[Get Read Stream]: ", { bucket, key });

  const stream = await s3Client
    .getObject({
      Bucket: bucket,
      Key: key,
    })
    .createReadStream();

  return stream;
};

export const deleteFile = async (bucket: string, key: string) => {
  console.info("[Delete File]: ", { bucket, key });

  await s3Client
    .deleteObject(
      {
        Bucket: bucket,
        Key: key,
      },
      (error) => {
        if (error) {
          console.error("[Delete File Error]:\n");
          throw error;
        }
      }
    )
    .promise();

  console.info("[Delete File]: Completed");
};

export const copyFile = async (bucket: string, key: string, newKey: string) => {
  console.info("[Copy File]: ", { bucket, key, newKey });

  await s3Client
    .copyObject(
      {
        Bucket: bucket,
        CopySource: `${bucket}/${key}`,
        Key: newKey,
      },
      (error) => {
        if (error) {
          console.error("[Copy File Error]:\n");
          throw error;
        }
      }
    )
    .promise();

  console.info("[Copy File]: Completed");
};
