import axios from "axios";
import { PostProps, ResponsePostProps } from "../types/post";

export const addPost = async (data: PostProps) => {
  return await (
    await axios.post(`http://localhost:6789/postagem`, data)
  ).data;
};

export const getUserPosts = async (userId: number): Promise<ResponsePostProps[]> => {
  return await (
    await axios.get(`http://localhost:6789/postagem?filterBy=codigo_usuario&key=${userId}`)
  ).data;
};

export const likePost = async (postId: number) => {
  return await (
    await axios.post(`http://localhost:6789/postagem/curtir?codigo=${postId}`)
  ).data;
};

export const getUserFeed = async (userId: number): Promise<ResponsePostProps[]> => {
  return await (
    await axios.get(`http://localhost:6789/postagem/feed/${userId}`)
  ).data;
};
