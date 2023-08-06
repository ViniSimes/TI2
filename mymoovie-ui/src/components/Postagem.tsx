import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FC, useState, useEffect } from "react";
import { ResponsePostProps } from "../types/post";
import { BiLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AvatarComponent } from "./AvatarComponent";
import { VoteDisplay } from "./VoteDisplay";
import { useLogin } from "../hooks/auth";
import { getMovie } from "../services/moviesService";
import { likePost } from "../services/postService";
import { colors, userDataDefault } from "../helpers";
import { UserProps } from "../types/user";
import { getUser } from "../services/userService";
import { toastConfig } from "../helpers/toast";
import { ResponseCommentProps } from "../types/comments";
import { getPostComments, likeComment } from "../services/commentService";
import { AddComment } from "./AddComment";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const Comment: FC<{ comment: ResponseCommentProps }> = ({ comment }) => {
  const [displayedUserData, setDisplayedUserData] =
    useState<UserProps>(userDataDefault);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [qtdCurtidas, setQtdCurtidas] = useState<number>(
    comment.quantidadeCurtidas
  );
  const toast = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      setDisplayedUserData(await getUser(comment.codigoUsuario));
    };

    fetchUser();
  }, []);

  const handleLikeComment = async () => {
    const res = await likeComment(comment.id);
    toast(toastConfig(res));
    setIsLiked(res.status);
    res.status && setQtdCurtidas(qtdCurtidas + 1);
  };

  return (
    <Flex alignItems="center" gap={3} mb={1}>
      <Flex alignItems="center" gap={1} color={colors.primaryRed}>
        <AvatarComponent size="sm" displayUserData={displayedUserData} />
        {displayedUserData.nomeUsuario}
      </Flex>
      <Flex w="100%" alignItems="center">
        <ChevronLeftIcon />
        <Box w="100%" bg={colors.darkWhite} p={2} borderRadius={4}>
          {comment.descricao}
        </Box>
      </Flex>
      <Button
        _disabled={{
          cursor: "default",
          bg: colors.green,
          color: colors.darkWhite,
          _hover: {},
        }}
        isDisabled={isLiked}
        _hover={{}}
        flex="1"
        variant="ghost"
        size="sm"
        leftIcon={<BiLike />}
        onClick={handleLikeComment}
      >
        ({qtdCurtidas})
      </Button>
    </Flex>
  );
};

export const Postagem: FC<{
  data: ResponsePostProps;
  profileUserData?: UserProps;
}> = ({ data, profileUserData }) => {
  const [moviePoster, setMoviePoster] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [qtdCurtidas, setQtdCurtidas] = useState<number>(
    data.quantidadeCurtidas
  );
  const [displayedUserData, setDisplayedUserData] =
    useState<UserProps>(userDataDefault);
  const [comments, setComments] = useState<ResponseCommentProps[]>([]);
  const [reloadComments, setReloadComments] = useState<boolean>(false);
  const { userData } = useLogin();
  const toast = useToast();

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await getMovie(data.codigoFilme);
      setMoviePoster(`https://image.tmdb.org/t/p/w500${movieData.poster_path}`);
    };

    fetchMovie();
  }, [data]);

  useEffect(() => {
    const fetchUser = async () => {
      if (profileUserData) {
        setDisplayedUserData(profileUserData);
      } else {
        setDisplayedUserData(await getUser(data.codigoUsuario));
      }
    };

    fetchUser();
  }, [profileUserData]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsData = await getPostComments(data.id);
      setComments(commentsData);
    };
    fetchComments();
  }, [reloadComments]);

  const handleLikePost = async () => {
    const res = await likePost(data.id);
    toast(toastConfig(res));
    setIsLiked(res.status);
    res.status && setQtdCurtidas(qtdCurtidas + 1);
  };

  return (
    <Card maxW="xl" p={4}>
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <AvatarComponent displayUserData={displayedUserData} />

            <Box>
              <Heading size="sm">{displayedUserData.nomeUsuario}</Heading>
              <Text>{displayedUserData.email}</Text>
              <Badge variant="outline" colorScheme="purple">
                Premium
              </Badge>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
            _hover={{}}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{data.comentario}</Text>
        <br />
        <VoteDisplay vote={data.nota} hasDesc="Nota do Usuário: " />
      </CardBody>
      <Image objectFit="cover" src={moviePoster} alt="poster do filme" />
      {userData.id !== displayedUserData.id && (
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button
            _disabled={{
              cursor: "default",
              bg: colors.green,
              color: colors.darkWhite,
              _hover: {},
            }}
            isDisabled={isLiked}
            _hover={{}}
            flex="1"
            variant="ghost"
            leftIcon={<BiLike />}
            onClick={handleLikePost}
          >
            Curtir ({qtdCurtidas})
          </Button>
          <AddComment
            postagemId={data.id}
            setReloadComments={setReloadComments}
          />
        </CardFooter>
      )}
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </Card>
  );
};
