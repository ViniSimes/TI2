import { useEffect, useState } from "react";
import { listUser } from "../services/userService";
import { UserProps } from "../types/user";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiUserSearchLine } from "react-icons/ri";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { colors, userDataDefault } from "../helpers";
import { useProfile } from "../hooks/profile";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { toastConfig } from "../helpers/toast";

interface SelectProps {
  label: string;
  value: number;
  userData: UserProps;
}

export const SearchUser = () => {
  const [userOptions, setUserOptions] = useState<SelectProps[]>([]);
  const [hasUserSelected, setHasUserSelected] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const { setDisplayUserData, isMineProfile, follow } = useProfile();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const userList = await listUser();
      const buildUserOptions: SelectProps[] = userList.map((userData) => ({
        label: userData.nomeUsuario,
        value: userData.id,
        userData,
      }));
      setUserOptions(buildUserOptions);
    };

    fetchData();
  }, []);

  const handleFollow = async () => {
    setIsLoading(true);
    const res = await follow();
    setIsLoading(false);
    toast(toastConfig(res));
  };

  return (
    <Flex alignItems="center">
      <Popover>
        <Tooltip label="Abrir busca de Usuário">
          <Box>
            <PopoverTrigger>
              <IconButton
                variant="ghost"
                _hover={{}}
                icon={
                  <Icon
                    as={RiUserSearchLine}
                    boxSize={5}
                    color={colors.white}
                    cursor="pointer"
                  />
                }
                aria-label="abrir-busca-usuario"
              />
            </PopoverTrigger>
          </Box>
        </Tooltip>
        <PopoverContent bg={colors.white} color={colors.darkRed} width="300px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Buscar Usuário</PopoverHeader>
          <PopoverBody>
            <Flex gap={1} justifyContent="space-between">
              <Select
                options={userOptions}
                onChange={(e) => {
                  setDisplayUserData(e?.userData ?? userDataDefault);
                  setHasUserSelected(true);
                }}
                useBasicStyles
                placeholder="Pesquise um usuário"
              />
              {hasUserSelected && !isMineProfile() && (
                <Flex gap={1} alignItems="center">
                  <Tooltip label="Ver Perfil">
                    <IconButton
                      icon={<ExternalLinkIcon />}
                      size="sm"
                      aria-label="ver-perfil"
                      onClick={() => navigate("/perfil")}
                    />
                  </Tooltip>
                  <Tooltip label="Seguir Usuário">
                    <IconButton
                      isLoading={loading}
                      icon={<Icon as={AiOutlineUserAdd} />}
                      size="sm"
                      aria-label="seguir-usuário"
                      onClick={handleFollow}
                    />
                  </Tooltip>
                </Flex>
              )}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
