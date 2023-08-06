import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginProvider } from "./hooks/auth";
import { MoviesProvider } from "./hooks/movies";
import { ProfileProvider } from "./hooks/profile";

const theme = extendTheme({
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LoginProvider>
        <MoviesProvider>
          <ProfileProvider>
            <App />
          </ProfileProvider>
        </MoviesProvider>
      </LoginProvider>
    </ChakraProvider>
  </React.StrictMode>
);
