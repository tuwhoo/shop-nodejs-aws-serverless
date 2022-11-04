import { lambdaWrapper } from "@libs/lambda";
import { APIGatewayEvent } from "aws-lambda";
import { readCsvFile } from "@libs/read-csv";
import { deleteFile, copyFile, getReadStream } from "@libs/aws-utils";

const importFileParser = async (event: APIGatewayEvent) => {
  const records = (event as any).Records;

  for (const record of records) {
    const bucketName = record.s3.bucket.name;
    const fileKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

    const newFileKey = fileKey.replace(
      process.env.IMPORT_BUCKET_UPLOAD_PREFIX,
      process.env.IMPORT_BUCKET_PARSED_PREFIX
    );

    const fileStream = await getReadStream(bucketName, fileKey);

    await readCsvFile(fileStream, (data: any) => console.log(data));
    await copyFile(bucketName, fileKey, newFileKey);
    await deleteFile(bucketName, fileKey);
  }
};

export const main = lambdaWrapper(importFileParser);
