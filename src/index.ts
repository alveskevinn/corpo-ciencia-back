import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import athleteRoutes from './routes/athlete.routes';  // Mantendo as rotas de atletas
import userRoutes from './routes/user.routes';  // Adicionando as rotas de usuários

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/athletes', athleteRoutes);  // Rota de atletas
app.use('/users', userRoutes);
 // Rota de usuários sem o prefixo /api

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
