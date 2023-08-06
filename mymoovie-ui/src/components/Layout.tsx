import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { colors } from "../helpers";
import { Header } from "./Header";

export const Layout: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <Box bg={colors.darkWhite} minH="100vh">
      <Header />
      <Box p={5}>{children}</Box>
    </Box>
  );
};
