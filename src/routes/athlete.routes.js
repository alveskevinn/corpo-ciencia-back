"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const athlete_controller_1 = require("../controllers/athlete.controller");
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router.post('/', athlete_controller_1.AthleteController.addAthlete);
router.get('/', auth_middleware_1.authMiddleware, athlete_controller_1.AthleteController.getAllAthletes);
router.get('/:id', auth_middleware_1.authMiddleware, athlete_controller_1.AthleteController.getAthleteByID);
router.put('/:id', auth_middleware_1.authMiddleware, athlete_controller_1.AthleteController.updateAthlete);
router.delete('/:id', auth_middleware_1.authMiddleware, athlete_controller_1.AthleteController.deleteAthlete);
router.post('/upload', upload.fields([{ name: 'planFile' }, { name: 'progressFile' }]), athlete_controller_1.AthleteController.uploadFiles);
exports.default = router;
