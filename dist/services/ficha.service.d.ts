import { Ficha } from '../models/ficha.model';
declare class FichaService {
    createFicha(athleteId: number, planFileUrl: string | undefined, progressFileUrl: string): Promise<any>;
    getAllFichas(): Promise<Ficha[]>;
    getFichaById(id: number): Promise<Ficha | null>;
    deleteFicha(id: number): Promise<boolean>;
}
declare const _default: FichaService;
export default _default;
