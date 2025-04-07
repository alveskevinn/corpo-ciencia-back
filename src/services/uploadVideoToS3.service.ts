import {
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime-types';


const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadVideoToS3(file: Express.Multer.File): Promise<string> {
  if (!file || !file.buffer || !file.mimetype) {
      throw new Error('Invalid file object received for S3 upload.');
  }

 

  const extension = mime.extension(file.mimetype);
  const safeExtension = extension ? `.${extension}` : '';
  const key = `videos/${uuidv4()}${safeExtension}`; 

  const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
      Body: file.buffer, 
      ContentType: file.mimetype, 
  });

  try {
      await s3.send(command);
      console.log(`Successfully uploaded ${key} to ${process.env.AWS_S3_BUCKET_NAME}`);

     

      return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  } catch (error) {
      console.error(`Error uploading ${key} to S3:`, error);
      throw new Error(`Failed to upload video to S3. S3 Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}