import axios from "axios";
import { CommentProps, ResponseCommentProps } from "../types/comments";

export const addComment = async (data: CommentProps) => {
  return await (
    await axios.post(`http://localhost:6789/comentario`, data)
  ).data;
};

export const likeComment = async (postId: number) => {
  return await (
    await axios.post(`http://localhost:6789/comentario/curtir?codigo=${postId}`)
  ).data;
};

export const getPostComments = async (postagemId: number): Promise<ResponseCommentProps[]> => {
  return await (
    await axios.get(`http://localhost:6789/comentario/${postagemId}`)
  ).data;
};
