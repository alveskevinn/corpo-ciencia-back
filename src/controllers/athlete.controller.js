"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteController = void 0;
const athlete_service_1 = require("../services/athlete.service");
const ficha_service_1 = __importDefault(require("../services/ficha.service"));
const arquivo_service_1 = __importDefault(require("../services/arquivo.service"));
exports.AthleteController = {
    addAthlete: async (req, res) => {
        try {
            const { firstName, email } = req.body;
            if (!firstName || !email) {
                res.status(400).json({ message: 'firstName e email são obrigatórios' });
                return;
            }
            const existingAthlete = await athlete_service_1.AthleteService.findByEmail(email);
            if (existingAthlete) {
                res.status(400).json({ message: 'E-mail já cadastrado' });
                return;
            }
            const newAthlete = await athlete_service_1.AthleteService.create({
                firstName,
                email,
                status: 'active',
            });
            res.status(201).json(newAthlete);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao criar atleta', error });
        }
    },
    getAllAthletes: async (req, res) => {
        try {
            const athletes = await athlete_service_1.AthleteService.getAll();
            res.json(athletes);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar atletas', error });
        }
    },
    getAthleteByID: async (req, res) => {
        try {
            const { id } = req.params;
            const athlete = await athlete_service_1.AthleteService.getByID(Number(id));
            if (!athlete) {
                res.status(404).json({ message: 'Atleta não encontrado' });
                return;
            }
            res.json(athlete);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar atleta', error });
        }
    },
    updateAthlete: async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;
            if (!data.firstName || !data.email || !data.status) {
                res.status(400).json({ message: 'Campos obrigatórios ausentes: firstName, email ou status' });
                return;
            }
            const updateAthele = await athlete_service_1.AthleteService.update(Number(id), data);
            if (!updateAthele) {
                res.status(404).json({ message: 'Atleta não encontrado' });
                return;
            }
            res.json(updateAthele);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar atleta', error });
        }
    },
    deleteAthlete: async (req, res) => {
        try {
            const { id } = req.params;
            await athlete_service_1.AthleteService.delete(Number(id));
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao deletar atleta', error });
        }
    },
    uploadFiles: async (req, res) => {
        try {
            const { athleteId } = req.body;
            console.log(req.body);
            const planFile = req.files?.['planFile'] ? req.files['planFile'][0] : null;
            const progressFile = req.files?.['progressFile'] ? req.files['progressFile'][0] : null;
            if (!athleteId) {
                res.status(400).json({ message: 'Atleta ID é obrigatório' });
                return;
            }
            if (!planFile && !progressFile) {
                res
                    .status(400)
                    .json({ message: 'Nenhum arquivo de plano ou progresso enviado' });
                return;
            }
            const uploadedFiles = await arquivo_service_1.default.uploadFiles(athleteId, planFile, progressFile);
            const ficha = await ficha_service_1.default.createFicha(athleteId, uploadedFiles.planFileUrl, uploadedFiles.progressFileUrl);
            res.status(201).json(ficha);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Erro ao fazer upload dos arquivos', error });
        }
    },
    getFicha: async (req, res) => {
        try {
            const { athleteId } = req.params;
            const ficha = await ficha_service_1.default.getFichaById(Number(athleteId));
            if (!ficha) {
                res.status(404).json({ message: 'Ficha não encontrada' });
                return;
            }
            res.json(ficha);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar ficha', error });
        }
    },
    deleteFicha: async (req, res) => {
        try {
            const { id } = req.params;
            await ficha_service_1.default.deleteFicha(Number(id));
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao deletar ficha', error });
        }
    },
};
