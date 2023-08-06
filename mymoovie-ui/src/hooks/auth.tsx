import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { UserProps } from "../types/user";
import { userDataDefault } from "../helpers";
interface UserDataProps {
  id: number;
  nomeUsuario: string;
  email: string;
  isPremium: boolean;
}

interface ContextProps {
  loginAuth: boolean;
  userToken: string;
  handleLogin: (token: string) => void;
  userData: UserDataProps;
  handleLogout: () => void;
  setNewUserData: (newUserData: UserDataProps) => void;
}

interface ProviderProps {
  children: JSX.Element;
}

const defaultState = {
  loginAuth: false,
  userToken: "",
  handleLogin: () => undefined,
  handleLogout: () => undefined,
  userData: userDataDefault,
  setNewUserData: (newUserData: UserDataProps) => undefined
};

interface TokenArrayProps extends UserProps {
  iat: string;
  exp: string;
}

export const LoginContext = React.createContext<ContextProps>(defaultState);

export const LoginProvider: React.FC<ProviderProps> = ({ children }) => {
  const [loginAuth, setLoginAuth] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>("");
  const [userData, setUserData] = useState<UserDataProps>(userDataDefault);

  const readCookie = () => {
    const token = Cookies.get("userToken");
    if (token) {
      setLoginAuth(true);
      setUserToken(token);
      const { id, nomeUsuario, isPremium, email }: TokenArrayProps =
        jwtDecode(token);
      setUserData({
        id,
        nomeUsuario,
        isPremium,
        email,
      });
    }
  };

  const handleLogin = (token: string) => {
    Cookies.set("userToken", token);
    localStorage.setItem("userToken", token);
    readCookie();
  };

  const handleLogout = () => {
    Cookies.remove("userToken");
    setLoginAuth(false);
    setUserToken("");
    setUserData(userDataDefault);
    readCookie();
  };

  const setNewUserData = (newUserData: UserDataProps) => {
    setUserData(newUserData);
  }

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        loginAuth,
        userToken,
        handleLogin,
        userData,
        handleLogout,
        setNewUserData,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => React.useContext(LoginContext);
