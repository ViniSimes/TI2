import React, { useState, Dispatch, SetStateAction } from "react";
import { userDataDefault } from "../helpers";
import { getUserPosts } from "../services/postService";
import { followUser, isFollower } from "../services/userService";
import { ResponsePostProps } from "../types/post";
import { FollowResponseProps, UserProps } from "../types/user";
import { useLogin } from "./auth";

interface ContextProps {
  setDisplayUserData: Dispatch<SetStateAction<UserProps>>;
  displayUserData: UserProps;
  isMineProfile: () => boolean;
  follow: () => Promise<FollowResponseProps>;
  follower: () => Promise<FollowResponseProps>;
  postsByUser: () => Promise<ResponsePostProps[]>
}

interface ProviderProps {
  children: JSX.Element;
}

const defaultProps: ContextProps = {
  displayUserData: userDataDefault,
  setDisplayUserData: () => {},
  isMineProfile: () => true,
  follow: async () => ({ status: false, mensagem: "" }),
  follower: async () => ({ status: false, mensagem: "" }),
  postsByUser: async () => ([]),
};

export const ProfileContext = React.createContext<ContextProps>(defaultProps);

export const ProfileProvider: React.FC<ProviderProps> = ({ children }) => {
  const [displayUserData, setDisplayUserData] =
    useState<UserProps>(userDataDefault);
  const { userData } = useLogin();

  const isMineProfile = (): boolean => {
    return displayUserData.id !== userData.id ? false : true;
  };

  const follow = async (): Promise<FollowResponseProps> => {
    const res = await followUser(userData.id, displayUserData.id);
    return res;
  };

  const follower = async (): Promise<FollowResponseProps> => {
    const res = await isFollower(userData.id, displayUserData.id);
    return res;
  };

  const postsByUser = async (): Promise<ResponsePostProps[]> => {
    return await getUserPosts(displayUserData.id);
  }

  return (
    <ProfileContext.Provider
      value={{
        displayUserData,
        setDisplayUserData,
        isMineProfile,
        follow,
        follower,
        postsByUser
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => React.useContext(ProfileContext);
