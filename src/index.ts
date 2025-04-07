import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

import athleteRoutes from './routes/athlete.routes';  
import userRoutes from './routes/user.routes';  
import exerciseRoutes from './routes/exercise.routes';
import exerciseListRoutes from './routes/exerciseList.routes'; // <- Novo
import authRoutes from './routes/auth.routes'; 
import trainingRoutes from './routes/treino.routes';
import mobilidadeRoutes from './routes/mobilidade.routes'
import tecnicasRoutes from './routes/tecnica.routes';

dotenv.config();

const app = express();
const upload = multer({ dest: 'temp/' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/athletes', athleteRoutes);  
app.use('/users', userRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/exercise-lists', exerciseListRoutes); // <- Aqui agora certo
app.use('/auth', authRoutes);  
app.use('/treinos', trainingRoutes);
app.use('/mobilidade', mobilidadeRoutes)  
app.use('/tecnicas', tecnicasRoutes)

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
