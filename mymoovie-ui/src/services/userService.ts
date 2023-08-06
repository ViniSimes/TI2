import axios from "axios";
import {
  FollowResponseProps,
  LoginProps,
  RegisterProps,
  UserProps,
} from "../types/user";

export const register = async (data: RegisterProps) => {
  return await (
    await axios.post(
      `http://localhost:6789/registro?email=${data.email}&senha=${data.password}&nomeUsuario=${data.userName}`
    )
  ).data;
};

export const login = async (data: LoginProps) => {
  return await (
    await axios.post(
      `http://localhost:6789/login?email=${data.email}&senha=${data.password}`
    )
  ).data;
};

export const listUser = async (): Promise<UserProps[]> => {
  return await (
    await axios.get(`http://localhost:6789/usuario`)
  ).data;
};

export const getUser = async (userId: number): Promise<UserProps> => {
  return await (
    await axios.get(`http://localhost:6789/usuario/${userId}`)
  ).data;
};

export const followUser = async (
  followerUserId: number,
  followedUserId: number
): Promise<FollowResponseProps> => {
  return await (
    await axios.post(
      `http://localhost:6789/seguir?usuarioQueSegue=${followerUserId}&usuarioSeguido=${followedUserId}`
    )
  ).data;
};

export const isFollower = async (
  followerUserId: number,
  followedUserId: number
): Promise<FollowResponseProps> => {
  return await (
    await axios.get(
      `http://localhost:6789/seguir/isSeguidor?usuarioQueSegue=${followerUserId}&usuarioSeguido=${followedUserId}`
    )
  ).data;
};

export const turnToPremium = async (userId: number): Promise<{ status: boolean; mensagem: string }> => {
  return await (
    await axios.post(
      `http://localhost:6789/usuario/tornarPremium/${userId}`
    )
  ).data;
};
