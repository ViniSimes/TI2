import {
  Button,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FC, useState, Dispatch, SetStateAction } from "react";
import { BiChat } from "react-icons/bi";
import { useLogin } from "../hooks/auth";
import { colors } from "../helpers";
import { toastConfig } from "../helpers/toast";
import { CommentProps } from "../types/comments";
import { addComment } from "../services/commentService";

export const AddComment: FC<{
  postagemId: number;
  setReloadComments: Dispatch<SetStateAction<boolean>>;
}> = ({ postagemId, setReloadComments }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { userData } = useLogin();
  const toast = useToast();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (comment == "") {
      toast(toastConfig({ status: false, mensagem: "Adicione um comentário" }));
    } else {
      const data: CommentProps = {
        codigoUsuario: userData.id,
        codigoPostagem: postagemId,
        descricao: comment,
      };
      const res = await addComment(data);
      toast(toastConfig(res));
      setComment("");
      onClose();
    }
    setIsSubmitting(false);
    setReloadComments((prevValue) => !prevValue)
  };

  return (
    <Popover isLazy isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          onClick={onToggle}
          flex="1"
          variant="ghost"
          leftIcon={<BiChat />}
        >
          Comentar
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader color={colors.darkRed} fontWeight="semibold">
          Adicionar Comentário
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Input
            placeholder="Escreva um comentario sobre a postagem!"
            as={Textarea}
            bg={colors.darkWhite}
            color={colors.darkRed}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            isLoading={isSubmitting}
            bg={colors.darkRed}
            color={colors.darkWhite}
            fontWeight="normal"
            size="sm"
            mt={1}
            _hover={{ bg: colors.primaryRed }}
            w="full"
            onClick={handleSubmit}
          >
            Publicar
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
