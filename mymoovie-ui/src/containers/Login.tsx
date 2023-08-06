import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, Form, FieldInputProps, FormikProps } from "formik";
import { colors } from "../helpers";
import * as Yup from "yup";
import { login } from "../services/userService";
import { LoginProps } from "../types/user";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/auth";
import { Logo } from "../components/Logo";
import { toastConfig } from "../helpers/toast";

interface FieldProps {
  field: FieldInputProps<string>;
  form: FormikProps<LoginProps>;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { handleLogin } = useLogin();
  const toast = useToast();

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email Invalido")
      .min(2, "Senha de Usuário curta!")
      .max(50, "Senha de Usuário curta!")
      .required("Email obrigatório!"),
    password: Yup.string()
      .min(2, "Senha de Usuário curta!")
      .max(50, "Senha de Usuário curta!")
      .required("Senha obrigatória!"),
  });

  return (
    <Box>
      <Formik
        initialValues={{ userName: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          const response = await login(values);
          if (response.status) {
            handleLogin(response.mensagem);
            navigate("/");
          } else {
            toast(toastConfig(response));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="email">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    form.errors.email && form.touched.email ? true : false
                  }
                >
                  <FormLabel>Email</FormLabel>
                  <Input type="email" {...field} placeholder="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    form.errors.password && form.touched.password ? true : false
                  }
                >
                  <FormLabel>Senha</FormLabel>
                  <Input type="password" {...field} placeholder="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <HStack m={4}>
              <Button
                isLoading={isSubmitting}
                type="submit"
                bg={colors.primaryRed}
                color={colors.white}
                _hover={{
                  bg: colors.lightRed,
                }}
              >
                Entrar
              </Button>
              <Button
                type="button"
                bg={colors.primaryRed}
                color={colors.white}
                _hover={{
                  bg: colors.lightRed,
                }}
                onClick={() => navigate("/cadastro")}
              >
                Cadastrar
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

function Login() {
  return (
    <>
      <Box bg={colors.darkWhite} h="100vh" p={5}>
        <Center>
          <Box textAlign="center">
            <Logo />
            <Text fontSize="40px" fontWeight="600">
              MyMoovie
            </Text>
            <LoginForm />
          </Box>
        </Center>
      </Box>
    </>
  );
}

export default Login;
