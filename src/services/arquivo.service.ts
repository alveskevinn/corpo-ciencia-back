import pool from '../config/db.config';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

class ArquivoService {
  async uploadFiles(athleteId: number, planFile: any, progressFile: any) {
    try {
      const uploadDir = path.resolve(__dirname, '../../uploads');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const planFilePath = planFile ? `${uploadDir}/${athleteId}-plan-${Date.now()}.xlsx` : null;
      const progressFilePath = progressFile ? `${uploadDir}/${athleteId}-progress-${Date.now()}.xlsx` : null;

      let extractedData = null;

      if (planFile) {
        fs.writeFileSync(planFilePath, planFile.buffer);
        extractedData = this.readExcel(planFilePath);
      }

      if (progressFile) {
        fs.writeFileSync(progressFilePath, progressFile.buffer);
      }

      await this.saveFileData(athleteId, planFilePath, progressFilePath);

      return { 
        planFileUrl: planFilePath, 
        progressFileUrl: progressFilePath,
        extractedData 
      };
    } catch (error) {
      throw new Error('Erro ao processar os arquivos: ' + error.message);
    }
  }

  private readExcel(filePath: string) {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; 
      const sheet = workbook.Sheets[sheetName];

      const result = {};

      for (let i = 2; i <= 8; i++) {
        const bCellRef = `A${i}`;
        const cCellRef = `B${i - 1}`; 

        const bValue = sheet[bCellRef]?.v;
        const cValue = sheet[cCellRef]?.v;

        if (bValue !== undefined && cValue !== undefined) {
          result[bValue] = cValue;
        }
      }

      console.log(`Dados extraídos do Excel (${filePath}):`, result);
      return result;
    } catch (error) {
      console.error(`Erro ao ler o arquivo Excel ${filePath}:`, error);
      throw new Error(`Erro ao ler o arquivo Excel: ${error.message || error}`);
    }
  }

  private async saveFileData(athleteId: number, planFilePath: string | null, progressFilePath: string | null) {
    try {
      await pool.execute(
        `INSERT INTO arquivos (athlete_id, file_type, file_url, created_at) 
         VALUES (?, 'plan', ?, NOW()), (?, 'progress', ?, NOW())`,
        [athleteId, planFilePath, athleteId, progressFilePath]
      );
    } catch (error) {
      console.error('Erro ao salvar os dados dos arquivos no banco:', error);
      throw new Error('Erro ao salvar os dados dos arquivos no banco');
    }
  }
}

export default new ArquivoService();
