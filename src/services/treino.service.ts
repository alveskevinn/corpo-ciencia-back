import { Pool } from 'mysql2/promise';
import pool from '../config/db.config';

export default class TrainingService {
  // Método para criar um treino com exercícios
  async createTraining(trainingData: any): Promise<any> {
    console.log("Dados do treinamento:", trainingData); // Verifique os dados recebidos

    for (const training of trainingData) {
      // Verificar se o treino já existe
      const checkQuery = 'SELECT * FROM treino WHERE nome_treino = ? AND aluno = ?';
      const [existingTraining] = await pool.execute(checkQuery, [training.nome_treino, training.aluno]);

      // Verifica se `existingTraining` é um array e se tem algum elemento
      if (Array.isArray(existingTraining) && existingTraining.length > 0) {
        console.log("Treino já existe, pulando inserção.");
        continue; // Pulamos a inserção deste treino
      }

      const queryTreino = `
        INSERT INTO treino 
        (aluno, planejamento, objetivos, nome_treino, text, aerobicos, showAerobicos) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const valuesTreino = [
        training.aluno,
        training.planejamento,
        training.objetivos,
        training.nome_treino,
        training.text ?? null,
        training.aerobicos ? JSON.stringify(training.aerobicos) : null,
        training.showAerobicos ?? null,
      ];

      console.log("Valores para a consulta:", valuesTreino); // Verifique os valores passados para a consulta

      try {
        const [resultTreino] = await pool.execute(queryTreino, valuesTreino);
        const treinoId = (resultTreino as any).insertId;

        // Inserir os exercícios
        for (const exercise of training.exercicio) {
          const queryExercicio = `
            INSERT INTO exercicios 
            (treino_id, bi_set, exercicio_principal, exercicio_aux1, exercicio_aux2, series, repeticoes, tecnica) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const valuesExercicio = [
            treinoId,
            exercise.bi_set ?? null,
            exercise.exercicio_principal ?? null,
            exercise.exercicio_aux1 ?? null,
            exercise.exercicio_aux2 ?? null,
            exercise.series ?? null,
            exercise.repeticoes ?? null,
            exercise.tecnica ?? null,
          ];

          await pool.execute(queryExercicio, valuesExercicio);
        }
      } catch (error) {
        console.error("Erro ao criar treino e exercícios:", error);
        throw new Error("Erro ao criar treino");
      }
    }

    return { message: 'Treinos e exercícios criados com sucesso!' };
  }

  // Método para obter todos os treinos
  async getTrainings() {
    const query = 'SELECT * FROM treino';

    try {
      const [trainings] = await pool.execute(query);
      return trainings;
    } catch (error) {
      throw new Error(`Erro ao buscar treinos: ${error.message}`);
    }
  }
}