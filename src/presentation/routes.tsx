import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomeScreen } from "./home";

export const appRoutes = createBrowserRouter(
  [
    {
      path: '/home',
      element: <HomeScreen></HomeScreen>,
    },
    {
      path: "*",
      element: <Navigate to={"/home"} replace />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
