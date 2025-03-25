"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../config/db.config"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const XLSX = __importStar(require("xlsx"));
class ArquivoService {
    async uploadFiles(athleteId, planFile, progressFile) {
        try {
            const uploadDir = path_1.default.resolve(__dirname, '../../uploads');
            if (!fs_1.default.existsSync(uploadDir)) {
                fs_1.default.mkdirSync(uploadDir, { recursive: true });
            }
            const planFilePath = planFile ? `${uploadDir}/${athleteId}-plan-${Date.now()}.xlsx` : null;
            const progressFilePath = progressFile ? `${uploadDir}/${athleteId}-progress-${Date.now()}.xlsx` : null;
            let extractedData = null;
            if (planFile) {
                fs_1.default.writeFileSync(planFilePath, planFile.buffer);
                extractedData = this.readExcel(planFilePath);
            }
            if (progressFile) {
                fs_1.default.writeFileSync(progressFilePath, progressFile.buffer);
            }
            await this.saveFileData(athleteId, planFilePath, progressFilePath);
            return {
                planFileUrl: planFilePath,
                progressFileUrl: progressFilePath,
                extractedData
            };
        }
        catch (error) {
            throw new Error('Erro ao processar os arquivos: ' + error.message);
        }
    }
    readExcel(filePath) {
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
        }
        catch (error) {
            console.error(`Erro ao ler o arquivo Excel ${filePath}:`, error);
            throw new Error(`Erro ao ler o arquivo Excel: ${error.message || error}`);
        }
    }
    async saveFileData(athleteId, planFilePath, progressFilePath) {
        try {
            await db_config_1.default.execute(`INSERT INTO arquivos (athlete_id, file_type, file_url, created_at) 
         VALUES (?, 'plan', ?, NOW()), (?, 'progress', ?, NOW())`, [athleteId, planFilePath, athleteId, progressFilePath]);
        }
        catch (error) {
            console.error('Erro ao salvar os dados dos arquivos no banco:', error);
            throw new Error('Erro ao salvar os dados dos arquivos no banco');
        }
    }
}
exports.default = new ArquivoService();
