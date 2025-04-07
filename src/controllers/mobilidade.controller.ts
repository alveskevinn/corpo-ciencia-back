import { Request, Response } from 'express';
import MobilidadeService from '../services/mobilidade.service';
import { Mobilidade } from '../models/mobilidade.model';
import { uploadVideoToS3 } from '../services/uploadVideoToS3.service';

class MobilidadeController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const mobilidades = await MobilidadeService.getAll();
      res.status(200).json(mobilidades);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar mobilidades', error: err });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const mobilidade = await MobilidadeService.getById(Number(id));
      if (mobilidade) {
        res.status(200).json(mobilidade);
      } else {
        res.status(404).json({ message: 'Mobilidade não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar mobilidade', error: err });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const name = req.body.name?.toString().trim();

      let videoUrl: string | null = null;
      if (req.file) {
        videoUrl = await uploadVideoToS3(req.file);
      }

      const novaMobilidade = await MobilidadeService.create({
        name,
        video_url: videoUrl,
      });

      res.status(201).json(novaMobilidade);
    } catch (err) {
      console.error('Erro ao criar mobilidade:', err);
      res.status(500).json({
        message: 'Erro ao criar mobilidade',
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const name = req.body.name?.toString().trim();

      let videoUrl: string | undefined = req.body.video_url;

      if (req.file) {
        videoUrl = await uploadVideoToS3(req.file);
      }

      const mobilidadeAtualizada = await MobilidadeService.update(Number(id), {
        name,
        video_url: videoUrl,
      });

      if (mobilidadeAtualizada) {
        res.status(200).json(mobilidadeAtualizada);
      } else {
        res.status(404).json({ message: 'Mobilidade não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar mobilidade', error: err });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const sucesso = await MobilidadeService.delete(Number(id));
      if (sucesso) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Mobilidade não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar mobilidade', error: err });
    }
  }
}

export default new MobilidadeController();
