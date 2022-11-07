import * as AWS from "aws-sdk";

const sns = new AWS.SNS();

export const publish = async (subject: string, message: string) => {
  console.info('[SNS] Publish: ', { subject, message })

  try {
    await sns
      .publish(
        {
          Subject: subject,
          Message: message,
          TopicArn: process.env.SNS_ARN,
        },
        (error) => {
          if (error) {
            console.log('[SNS PUBLISH ERROR] Failed to publish: ', error );
          }
        }
      )
      .promise();
  } catch (error) {
    console.log('[SNS ERROR]: ', error );
  }
};
