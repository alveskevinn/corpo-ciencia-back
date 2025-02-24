export interface Arquivo {
    id: number;                      
    athleteId: number;               
    fileType: 'plan' | 'progress';   
    fileUrl: string;                 
    createdAt: string;               
  }
  