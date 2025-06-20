import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthScreen } from "./auth/AuthScreen";
import { LoginScreen } from "./auth/login/LoginScreen";
import { HomeScreen, SellerScreen } from "./home";

export const appRoutes = createBrowserRouter(
  [
    {
      path: "/auth",
      element: <AuthScreen></AuthScreen>,
      children: [
        {
          path: '/auth/login',
          element: <LoginScreen></LoginScreen>
        },
        {
          path: '',
          element: <Navigate to={'/auth/login'} replace/>
        }
      ]
    },
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
