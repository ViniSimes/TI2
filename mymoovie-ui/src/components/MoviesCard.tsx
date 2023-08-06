import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { MoviesProps } from "../types/movies";
import { VoteDisplay } from "./VoteDisplay";

export const MoviesCard: FC<{ data: MoviesProps }> = ({ data }) => {
  return (
    <Box textAlign="center">
      <Image
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        _hover={{ opacity: "0.8", transition: "1s" }}
        mb={1}
        borderRadius="8px"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
      />
      <Flex textAlign="left">
        <VoteDisplay vote={data.vote_average} />
        <Text
          ml={1}
          width="15em"
          overflow="hidden"
          display="block"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {data.title}
        </Text>
      </Flex>
    </Box>
  );
};
