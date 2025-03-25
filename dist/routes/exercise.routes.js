"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exercise_controller_1 = __importDefault(require("../controllers/exercise.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.authMiddleware, exercise_controller_1.default.getAllExercises);
router.get('/:id', auth_middleware_1.authMiddleware, exercise_controller_1.default.getExerciseById);
router.post('/', auth_middleware_1.authMiddleware, exercise_controller_1.default.createExercise);
router.put('/:id', auth_middleware_1.authMiddleware, exercise_controller_1.default.updateExercise);
router.delete('/:id', auth_middleware_1.authMiddleware, exercise_controller_1.default.deleteExercise);
exports.default = router;
