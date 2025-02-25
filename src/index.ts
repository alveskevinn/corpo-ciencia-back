import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import athleteRoutes from './routes/athlete.routes';  
import userRoutes from './routes/user.routes';  
import exerciseRoutes from './routes/exercise.routes';
import authRoutes from './routes/auth.routes';  // Importando as rotas de autenticação

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/athletes', athleteRoutes);  
app.use('/users', userRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/auth', authRoutes);  // Definindo a rota de autenticação

app.get('/', (req, res) => {
  res.send('API funcionando!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
