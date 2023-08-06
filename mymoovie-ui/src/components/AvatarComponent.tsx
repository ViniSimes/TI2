import { Avatar } from "@chakra-ui/react";
import { FC } from "react";
import { colors } from "../helpers";
import { useLogin } from "../hooks/auth";
import { UserProps } from "../types/user";

export const AvatarComponent: FC<{ size?: string, displayUserData?: UserProps }> = ({ size, displayUserData }) => {
  const { userData } = useLogin();

  return (
    <Avatar
      name={displayUserData ? displayUserData.nomeUsuario : userData.nomeUsuario}
      bg={colors.darkWhite}
      color={colors.primaryRed}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      cursor="pointer"
      size={size ? size : "md"}
    />
  );
};
