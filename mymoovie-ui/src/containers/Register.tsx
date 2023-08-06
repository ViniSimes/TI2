import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, Form, FieldInputProps, FormikProps } from "formik";
import { colors } from "../helpers";
import * as Yup from "yup";
import { register } from "../services/userService";
import { RegisterProps } from "../types/user";
import { Logo } from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { toastConfig } from "../helpers/toast";

interface FieldProps {
  field: FieldInputProps<string>;
  form: FormikProps<RegisterProps>;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, "Nome de Usuário curto!")
      .max(50, "Nome de Usuário longo!")
      .required("Nome de usuário obrigatório"),
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
          const response = await register(values);
          if (response.status) {
            navigate('/login');
          }
          toast(toastConfig(response));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="userName">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    form.errors.userName && form.touched.userName ? true : false
                  }
                >
                  <FormLabel>Nome de Usuário</FormLabel>
                  <Input {...field} placeholder="name" />
                  <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
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
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              bg={colors.primaryRed}
              color={colors.white}
              _hover={{
                bg: colors.lightRed,
              }}
            >
              Cadastrar
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

function Register() {
  return (
    <>
      <Box bg={colors.darkWhite} h="100vh" p={5}>
        <Center>
          <Box textAlign="center">
            <Logo />
            <Text fontSize="40px" fontWeight="600">
              MyMoovie
            </Text>
            <RegisterForm />
          </Box>
        </Center>
      </Box>
    </>
  );
}

export default Register;
