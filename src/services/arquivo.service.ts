import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import pool from '../config/db.config';
import { Request } from 'express';

const s3Client = new S3Client({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

class ArquivoService {
  async uploadFiles(athleteId: number, planFile: any, progressFile: any) {
    try {
      const planFileUrl = planFile ? await this.uploadToS3(planFile, 'plan', athleteId) : null;
      const progressFileUrl = progressFile ? await this.uploadToS3(progressFile, 'progress', athleteId) : null;

      return { planFileUrl, progressFileUrl };
    } catch (error) {
      throw new Error('Erro ao fazer upload dos arquivos: ' + error.message);
    }
  }

  private async uploadToS3(file: any, type: string, athleteId: number): Promise<string> {
    const fileName = `${athleteId}-${type}-${Date.now()}`; 

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,  
      Key: fileName,  
      Body: file.buffer,  
      ContentType: file.mimetype,  
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      
      return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/arquivos/${fileName}`;
    } catch (err) {
      throw new Error('Erro no upload: ' + err.message);
    }
  }
}

export default new ArquivoService();
