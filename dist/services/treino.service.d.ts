export default class TrainingService {
    createTraining(trainingData: any): Promise<any>;
    getTrainings(): Promise<import("mysql2/promise").QueryResult>;
}
