import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";

export const AuthRouter = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "/auth/*",
    element: <Navigate to="login" />,
  },
  {
    path: "/auth",
    element: <Navigate to="login" />,
  },
];
