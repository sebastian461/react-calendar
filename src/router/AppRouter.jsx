import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthRouter } from "../auth/router/AuthRouter";
import { CalentarRouter } from "./router/CalentarRouter";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

const notAuthenticatedRoutes = [
  {
    path: "auth",
    children: AuthRouter,
  },
  {
    path: "/*",
    element: <Navigate to="auth" />,
  },
];

const authenticatedRoutes = [
  {
    path: "/",
    children: CalentarRouter,
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
];

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") return <h3>Cargando</h3>;

  const routes =
    status === "authenticated"
      ? [...authenticatedRoutes]
      : [...notAuthenticatedRoutes];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
