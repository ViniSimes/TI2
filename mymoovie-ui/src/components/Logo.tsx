import { Image } from "@chakra-ui/react";
import { FC } from "react";
import LOGO from "./../../public/mymoovielogo.png";

export const Logo: FC<{ size?: string; onClick?: () => void }> = ({
  size,
  onClick,
}) => (
  <Image
    onClick={() => onClick && onClick()}
    cursor={onClick ? "pointer" : "normal"}
    src={LOGO}
    h={size ? size : "150"}
  />
);
