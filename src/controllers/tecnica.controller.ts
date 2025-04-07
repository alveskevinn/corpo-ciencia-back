import { Request, Response } from 'express';
import tecnicaService from '../services/tecnica.service';
import { uploadVideoToS3 } from '../services/uploadVideoToS3.service';

class TecnicaController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const tecnicas = await tecnicaService.getAll();
      res.status(200).json(tecnicas);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar técnicas', error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const tecnica = await tecnicaService.getById(Number(id));

      if (!tecnica) {
        res.status(404).json({ message: 'Técnica não encontrada' });
        return;
      }

      res.status(200).json(tecnica);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar técnica', error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const nome = req.body.nome?.toString().trim();
      const descricao = req.body.descricao?.toString().trim();

      if (!nome || !descricao) {
        res.status(400).json({ message: 'Campos obrigatórios: nome e descricao' });
        return;
      }

      let videoUrl: string | null = null;
      if (req.file) {
        videoUrl = await uploadVideoToS3(req.file);
      }

      const newTecnica = await tecnicaService.create({
        nome,
        descricao,
        video: videoUrl,
      });

      res.status(201).json(newTecnica);
    } catch (error) {
      console.error('Erro ao criar técnica:', error);
      res.status(500).json({ message: 'Erro ao criar técnica', error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const nome = req.body.nome?.toString().trim();
      const descricao = req.body.descricao?.toString().trim();

      let videoUrl: string | undefined = req.body.video;

      if (req.file) {
        videoUrl = await uploadVideoToS3(req.file);
      }

      const updatedTecnica = await tecnicaService.update(Number(id), {
        nome,
        descricao,
        video: videoUrl,
      });

      if (!updatedTecnica) {
        res.status(404).json({ message: 'Técnica não encontrada' });
        return;
      }

      res.status(200).json(updatedTecnica);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar técnica', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await tecnicaService.delete(Number(id));

      if (!deleted) {
        res.status(404).json({ message: 'Técnica não encontrada' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar técnica', error });
    }
  }
}

export default new TecnicaController();
