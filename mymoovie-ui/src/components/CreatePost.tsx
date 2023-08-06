import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { colors } from "../helpers";
import { AvatarComponent } from "./AvatarComponent";
import { useMovies } from "../hooks/movies";
import { MoviesProps } from "../types/movies";
import { MoviesCard } from "./MoviesCard";
import { useLogin } from "../hooks/auth";
import { PostProps } from "../types/post";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import { addPost } from "../services/postService";
import { toastConfig } from "../helpers/toast";

const SelectMovie = () => {
  const [inputTerm, setInputTerm] = useState<string>("");
  const [resultMovies, setResultMovies] = useState<MoviesProps[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { searchMovie, setSelectedMovie, selectedMovie } = useMovies();

  const handleSearch = async () => {
    const res = await searchMovie(inputTerm);
    setResultMovies(res);
  };

  const handleSelectMovie = (movieData: MoviesProps) => {
    setSelectedMovie(movieData);
    onClose();
  };

  return (
    <>
      {selectedMovie ? (
        <Flex textAlign="center">
          <Text color={colors.darkWhite}>
            {selectedMovie.id} - {selectedMovie.title}
          </Text>
        </Flex>
      ) : (
        <Button
          type="button"
          bg={colors.darkWhite}
          color={colors.darkRed}
          fontWeight="normal"
          size="sm"
          onClick={onOpen}
        >
          Escolher Filme
        </Button>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent bg={colors.darkWhite}>
          <ModalHeader color={colors.primaryRed}>Procurar Filme</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              focusBorderColor={colors.darkRed}
              borderColor={colors.primaryRed}
              onChange={(e) => setInputTerm(e.target.value)}
            />
            <Button
              leftIcon={<SearchIcon />}
              bg={colors.primaryRed}
              color={colors.darkWhite}
              _hover={{ bg: colors.lightRed }}
              onClick={handleSearch}
              my={2}
            >
              Procurar
            </Button>
            <Grid
              templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}
              gap={1}
            >
              {resultMovies.map((movie) => (
                <GridItem
                  cursor="pointer"
                  onClick={() => handleSelectMovie(movie)}
                >
                  <MoviesCard data={movie} />
                </GridItem>
              ))}
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onClose}
              color={colors.primaryRed}
              _hover={{}}
              variant="ghost"
            >
              Voltar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const CreatePost = () => {
  const { selectedMovie, setSelectedMovie } = useMovies();
  const { userData } = useLogin();
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    nota: Yup.number()
      .min(1, "Nota mínima 1")
      .max(10, "Nota máxima 10")
      .required("Nota obrigatória!"),
    comentario: Yup.string()
      .min(2, "Comentário curto!")
      .max(150, "Comentário longo!")
      .required("Comentário obrigatório!"),
    destaque: Yup.boolean(),
    impulsionar: Yup.boolean(),
  });

  return (
    <Box
      bg={colors.primaryRed}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      borderRadius="10px"
      p={3}
    >
      <Formik
        initialValues={{
          nota: 0,
          comentario: "",
          destaque: false,
          impulsionar: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (formValues, { resetForm }) => {
          const postData: PostProps = {
            nota: formValues.nota,
            comentario: formValues.comentario,
            destaque: formValues.destaque,
            impulsionar: formValues.impulsionar,
            codigoFilme: selectedMovie?.id ?? 0,
            codigoUsuario: userData.id,
          };
          if (postData.codigoFilme === 0) {
            toast({
              description: "Escolha um filme para publicar",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else {
            const res = await addPost(postData);
            toast(toastConfig(res));
            setSelectedMovie(undefined);
            resetForm();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex gap={4} display={["block", "block", "block", "flex", "flex"]}>
              <AvatarComponent />
              <Box mt={[5, 5, 5, 0, 0]}>
                <Field name="comentario">
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      isInvalid={
                        form.errors.comentario && form.touched.comentario
                          ? true
                          : false
                      }
                    >
                      <Input
                        placeholder="Escreva sobre um filme!"
                        as={Textarea}
                        bg={colors.darkWhite}
                        color={colors.darkRed}
                        {...field}
                      />
                      <FormErrorMessage>
                        {String(form.errors.comentario)}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Flex
                  gap={1}
                  mt={2}
                  display={["grid", "grid", "grid", "flex", "flex"]}
                  justifyContent="center"
                >
                  <Field name="nota">
                    {({ field, form }: FieldProps) => (
                      <>
                        <FormControl
                          isInvalid={
                            form.errors.nota && form.touched.nota ? true : false
                          }
                          maxW="100px"
                        >
                          <Select
                            placeholder="Nota"
                            bg={colors.darkWhite}
                            color={colors.darkRed}
                            size="sm"
                            {...field}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                              (option, i) => (
                                <option key={i} value={option}>
                                  {option}
                                </option>
                              )
                            )}
                          </Select>
                          <FormErrorMessage>
                            {String(form.errors.nota)}
                          </FormErrorMessage>
                        </FormControl>
                      </>
                    )}
                  </Field>
                  <SelectMovie />
                  <Stack spacing={5} direction="row">
                    <Field name="destaque">
                      {({ field, form }: FieldProps) => (
                        <>
                          <FormControl
                            isInvalid={
                              form.errors.destaque && form.touched.destaque
                                ? true
                                : false
                            }
                          >
                            <Checkbox
                              color={colors.darkWhite}
                              colorScheme="green"
                              {...field}
                            >
                              Destaque
                            </Checkbox>
                            <FormErrorMessage>
                              {String(form.errors.destaque)}
                            </FormErrorMessage>
                          </FormControl>
                        </>
                      )}
                    </Field>
                    <Field name="impulsionar">
                      {({ field, form }: FieldProps) => (
                        <>
                          <FormControl
                            isInvalid={
                              form.errors.impulsionar &&
                              form.touched.impulsionar
                                ? true
                                : false
                            }
                          >
                            <Checkbox
                              {...field}
                              color={colors.darkWhite}
                              colorScheme="green"
                            >
                              Impulsionar
                            </Checkbox>
                            <FormErrorMessage>
                              {String(form.errors.impulsionar)}
                            </FormErrorMessage>
                          </FormControl>
                        </>
                      )}
                    </Field>
                  </Stack>
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    bg={colors.darkWhite}
                    color={colors.darkRed}
                    fontWeight="normal"
                    size="sm"
                    maxW={["full", "full", "sm", "sm", "sm"]}
                  >
                    Publicar
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
