export interface CommentProps {
  codigoUsuario: number;
  codigoPostagem: number;
  descricao: string;
}

export interface ResponseCommentProps extends CommentProps {
  id: number;
  quantidadeCurtidas: number;
}