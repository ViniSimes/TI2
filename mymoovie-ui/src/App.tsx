import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Feed from "./containers/Feed";
import Register from "./containers/Register";
import Profile from "./containers/Profile";
import Login from "./containers/Login";
import { useLogin } from "./hooks/auth";

export default function App() {
  const { loginAuth } = useLogin();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={loginAuth ? <Feed /> : <Navigate to="/login" />}
        />
        <Route
          path="/perfil"
          element={loginAuth ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/cadastro"
          element={!loginAuth ? <Register /> : <Navigate to="/perfil" />}
        />
        <Route
          path="/login"
          element={!loginAuth ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
