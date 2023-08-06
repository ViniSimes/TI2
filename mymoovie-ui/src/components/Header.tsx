import {
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { colors } from "../helpers";
import { useLogin } from "../hooks/auth";
import { useProfile } from "../hooks/profile";
import { SearchUser } from "./SearchUser";
import { AvatarComponent } from "./AvatarComponent";
import { Logo } from "./Logo";
import { turnToPremium } from "../services/userService";
import { toastConfig } from "../helpers/toast";

const UserMenu = () => {
  const { handleLogout, userData, setNewUserData } = useLogin();
  const { setDisplayUserData } = useProfile();
  const navigate = useNavigate();
  const toast = useToast();

  const handleTurnToPremium = async () => {
    const res = await turnToPremium(userData.id);
    toast(toastConfig(res));
    const newUserData = userData;
    newUserData.isPremium = res.status;
    setNewUserData(newUserData);
  };

  return (
    <Menu>
      <MenuButton>
        <AvatarComponent />
      </MenuButton>
      <MenuList bg={colors.white} color={colors.primaryRed}>
        <MenuItem
          onClick={() => {
            setDisplayUserData(userData);
            navigate("/perfil");
          }}
          _hover={{
            backgroundColor: colors.primaryRed,
            color: colors.white,
          }}
          bg={colors.white}
        >
          Perfil
        </MenuItem>
        {!userData.isPremium && (
          <MenuItem
            _hover={{
              backgroundColor: colors.primaryRed,
              color: colors.white,
            }}
            bg={colors.white}
            onClick={handleTurnToPremium}
          >
            Atualizar para Premium
          </MenuItem>
        )}
        <MenuItem
          onClick={handleLogout}
          _hover={{
            backgroundColor: colors.primaryRed,
            color: colors.white,
          }}
          bg={colors.white}
        >
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export const Header = () => {
  const navigate = useNavigate();
  return (
    <Flex w="98.9vw" h="70px" bg={colors.primaryRed}>
      <HStack justifyContent="space-between" w="100%" p={5}>
        <Logo size="70px" onClick={() => navigate("/")} />
        <Flex gap={3}>
          <SearchUser />
          <UserMenu />
        </Flex>
      </HStack>
    </Flex>
  );
};
