// types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
      // files?: Express.Multer.File[];
      user?: { id: number; email: string; role: string };
    }
  }
}
