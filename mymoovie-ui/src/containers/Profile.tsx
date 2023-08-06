import { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Text,
  Icon,
  useToast,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { AvatarComponent } from "../components/AvatarComponent";
import { Layout } from "../components/Layout";
import { useProfile } from "../hooks/profile";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiUserFollowLine } from "react-icons/ri";
import { colors } from "../helpers";
import { ResponsePostProps } from "../types/post";
import { Postagem } from "../components/Postagem";
import { toastConfig } from "../helpers/toast";

function Profile() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState<ResponsePostProps[]>([]);
  const {
    displayUserData: userData,
    isMineProfile,
    follow,
    follower,
    postsByUser,
  } = useProfile();
  const toast = useToast();

  const handleFollow = async () => {
    setIsLoading(true);
    const res = await follow();
    setIsLoading(false);
    toast(toastConfig(res));
  };

  useEffect(() => {
    const handlerFollower = async () => {
      const res = await follower();
      setIsFollower(res.status);
    };

    const handleUserPosts = async () => {
      const res = await postsByUser();
      setUserPosts(res);
    };

    handlerFollower();
    handleUserPosts();
  }, [loading, userData]);

  return (
    <Layout>
      <>
        <Center>
          <Box>
            <HStack gap={3}>
              <AvatarComponent size="2xl" displayUserData={userData} />
              <Box>
                <Text
                  fontWeight="bold"
                  fontSize="2xl"
                  textTransform="capitalize"
                >
                  {userData.nomeUsuario} / {userData.id}
                </Text>
                <Text fontSize="xl" opacity="0.5">
                  {userData.email}
                </Text>
                {userData.isPremium ? (
                  <Badge variant="outline" colorScheme="purple">
                    Conta Premium
                  </Badge>
                ) : (
                  <Badge variant="outline" colorScheme="yellow">
                    Conta Padrão
                  </Badge>
                )}
                <br />
                {!isMineProfile() && (
                  <>
                    {isFollower ? (
                      <Flex
                        textAlign="center"
                        gap={1}
                        mt={2}
                        color={colors.green}
                      >
                        <Icon as={RiUserFollowLine} boxSize={5} /> Seguindo
                      </Flex>
                    ) : (
                      <Button
                        isLoading={loading}
                        leftIcon={<Icon as={AiOutlineUserAdd} />}
                        bg={colors.primaryRed}
                        color={colors.white}
                        _hover={{
                          bg: colors.lightRed,
                        }}
                        size="sm"
                        m={2}
                        onClick={() => handleFollow()}
                      >
                        Seguir Usuário
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </HStack>
            <VStack>
              <Text as="h2" fontSize="xl" color={colors.primaryRed}>Postagens</Text>
              {userPosts.map((post, i) => (
                <Postagem data={post} key={i} profileUserData={userData} />
              ))}
            </VStack>
          </Box>
        </Center>
      </>
    </Layout>
  );
}

export default Profile;
