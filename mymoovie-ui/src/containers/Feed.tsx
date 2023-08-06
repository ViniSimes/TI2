import { Box, Center, GridItem, Text, VStack } from "@chakra-ui/react";
import { CreatePost } from "../components/CreatePost";
import { Layout } from "../components/Layout";
import { MoviesCard } from "../components/MoviesCard";
import { MoviesGrid } from "../components/MoviesGrid";
import { colors } from "../helpers";
import { useMovies } from "../hooks/movies";
import { useState, useEffect } from "react";
import { ResponsePostProps } from "../types/post";
import { getUserFeed } from "../services/postService";
import { useLogin } from "../hooks/auth";
import { Postagem } from "../components/Postagem";

function Feed() {
  const [feedPosts, setFeedPosts] = useState<ResponsePostProps[]>([]);
  const { movies } = useMovies();
  const { userData } = useLogin();

  useEffect(() => {
    const fetchFeedPosts = async () => {
      const data = await getUserFeed(userData.id);
      setFeedPosts(data);
    };
    fetchFeedPosts();
  }, []);

  return (
    <Layout>
      <Box>
        <Center>
          <Box w={[300, 400, 500, 600]}>
            <CreatePost />
          </Box>
        </Center>
        <Center m={3}></Center>
        {feedPosts.length > 0 ? (
          <VStack>
            <Text as="h2" fontSize="4xl" color={colors.primaryRed}>
              Feed
            </Text>
            {feedPosts.map((post, i) => (
              <Postagem data={post} key={i} />
            ))}
          </VStack>
        ) : (
          <>
            <Text color={colors.primaryRed} fontSize="5xl">
              Mais Procurados
            </Text>
            <MoviesGrid>
              <>
                {movies.map((movie, i) => (
                  <GridItem>
                    <MoviesCard data={movie} key={i} />
                  </GridItem>
                ))}
              </>
            </MoviesGrid>
          </>
        )}
      </Box>
    </Layout>
  );
}

export default Feed;
