"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const treino_controller_1 = require("../controllers/treino.controller");
const router = (0, express_1.Router)();
const trainingController = new treino_controller_1.TrainingController();
const asyncHandler = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch(next);
    };
};
router.post('/', asyncHandler((req, res) => trainingController.createTraining(req, res)));
router.get('/', asyncHandler((req, res) => trainingController.getTrainings(req, res)));
exports.default = router;
