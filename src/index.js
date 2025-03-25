"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const athlete_routes_1 = __importDefault(require("./routes/athlete.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const exercise_routes_1 = __importDefault(require("./routes/exercise.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const authathlete_routes_1 = __importDefault(require("./routes/authathlete.routes"));
const treino_routes_1 = __importDefault(require("./routes/treino.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/athletes', athlete_routes_1.default);
app.use('/users', user_routes_1.default);
app.use('/exercises', exercise_routes_1.default);
app.use('/auth', auth_routes_1.default);
app.use('/auth', authathlete_routes_1.default);
app.use('/treinos', treino_routes_1.default);
app.get('/', (req, res) => {
    res.send('API funcionando!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
