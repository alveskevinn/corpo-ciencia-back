"use strict";
// import pool from '../config/db.config';
// import { Request, Response } from 'express';
// import fs from 'fs';
// import path from 'path';
// import * as XLSX from 'xlsx';
// interface FileUpload {
//   buffer: Buffer;
// }
// class ArquivoService {
//   async uploadFiles(athleteId: number, planFile: any | null, progressFile: any | null) {
//     try {
//       const uploadDir = path.resolve(__dirname, '../../uploads');
//       if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//       }
//       const planFilePath = planFile ? path.join(uploadDir, `${athleteId}-plan-${Date.now()}.xlsx`) : null;
//       const progressFilePath = progressFile ? path.join(uploadDir, `${athleteId}-progress-${Date.now()}.xlsx`) : null;
//       let extractedData = null;
//       if (planFile) {
//         fs.writeFileSync(planFilePath, planFile.buffer);
//         extractedData = this.readExcel(planFilePath);
//       }
//       if (progressFile) {
//         fs.writeFileSync(progressFilePath, progressFile.buffer);
//       }
//       await this.saveFileData(athleteId, planFilePath, progressFilePath);
//       return { 
//         planFileUrl: planFilePath, 
//         progressFileUrl: progressFilePath,
//         extractedData 
//       };
//     } catch (error) {
//       console.error('Erro ao processar os arquivos:', error);
//       throw new Error('Erro ao processar os arquivos: ' + error.message);
//     }
//   }
//   private readExcel(filePath: string) {
//     try {
//       const workbook = XLSX.readFile(filePath);
//       const sheetName = workbook.SheetNames[0]; 
//       const sheet = workbook.Sheets[sheetName];
//       const result: Record<string, string> = {};
//       for (let i = 2; i <= 8; i++) {
//         const bCellRef = `A${i}`;
//         const cCellRef = `B${i - 1}`; 
//         const bValue = sheet[bCellRef]?.v;
//         const cValue = sheet[cCellRef]?.v;
//         if (bValue !== undefined && cValue !== undefined) {
//           result[bValue] = cValue;
//         }
//       }
//       console.log(`Dados extraídos do Excel (${filePath}):`, result);
//       return result;
//     } catch (error) {
//       console.error(`Erro ao ler o arquivo Excel ${filePath}:`, error);
//       if (error instanceof Error) {
//         throw new Error(`Erro ao ler o arquivo Excel: ${error.message}`);
//       } else {
//         throw new Error(`Erro ao ler o arquivo Excel: ${String(error)}`);
//       }
//     }
//   }
//   private async saveFileData(athleteId: number, planFilePath: string | null, progressFilePath: string | null) {
//     try {
//       const query = `
//         INSERT INTO arquivos (athlete_id, file_type, file_url, created_at) 
//         VALUES (?, 'plan', ?, NOW()), (?, 'progress', ?, NOW())
//       `;
//       const params = [athleteId, planFilePath, athleteId, progressFilePath];
//       const [result] = await pool.execute(query, params);
//       console.log('Dados salvos no banco de dados:', result);
//     } catch (error) {
//       console.error('Erro ao salvar os dados dos arquivos no banco:', error);
//       throw new Error('Erro ao salvar os dados dos arquivos no banco');
//     }
//   }
// }
// export default new ArquivoService();
