import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: "${env:IMPORT_BUCKET_NAME}",
        event: "s3:ObjectCreated:*",
        rules: [
          {
            prefix: "${env:IMPORT_BUCKET_UPLOAD_PREFIX}",
          },
        ],
        existing: true,
      },
    },
  ],
};