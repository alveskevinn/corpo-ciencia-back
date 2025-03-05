export interface Exercise {
  id: number;
  name: string;
  musculo_principal: string;
  category: string;
  group_muscular: string;
  video_url: string;
  auxiliar_1?: string;
  auxiliar_2?: string;
  created_at?: string;
}
