export interface Habito {
  id_habito: string;
  user_id: string;
  label: string;
  descripcion: string;
  fecha: string;
  completado: boolean;
  created_at?: string;
  updated_at?: string;
}
