import { Grid } from "@chakra-ui/react";
import { FC } from "react";

export const MoviesGrid: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
      ]}
      margin={[5, 30]}
      gap={3}
    >
      {children}
    </Grid>
  );
};
