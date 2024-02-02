import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthRouter } from "../auth/router/AuthRouter";
import { CalentarRouter } from "./router/CalentarRouter";

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

const isAuthenticated = false;

const routes = isAuthenticated
  ? [...authenticatedRoutes]
  : [...notAuthenticatedRoutes];

export const AppRouter = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
