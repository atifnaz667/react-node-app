import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AlreadyLoggedIn from "./components/AlreadyLoggedIn";
import { Layout } from "./pages/layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {Layout(Home, 'userPanel')({})}
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            {Layout(About, 'userPanel')({})}
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <AlreadyLoggedIn>
            {Layout(Signup, 'site')({})}
          </AlreadyLoggedIn>
        ),
      },
      {
        path: "login",
        element: (
          <AlreadyLoggedIn>
            {Layout(Login, 'site')({})}
          </AlreadyLoggedIn>
        ),
      },
    ],
  },
]);

export default router;
  