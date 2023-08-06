import { UseToastOptions } from "@chakra-ui/react";

export const toastConfig = (resp: { status: boolean, mensagem: string }): UseToastOptions => ({
  description: resp.mensagem,
  status: resp.status ? "success" : "error",
  duration: 9000,
  isClosable: true,
})