export interface PostProps {
  nota: number;
  comentario: string;
  codigoFilme: number;
  codigoUsuario: number;
  destaque: boolean;
  impulsionar: boolean;
}

export interface ResponsePostProps extends PostProps {
  id: number;
  quantidadeCurtidas: number;
}