import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Home/Dashboard";
import EditResume from "./pages/ResumeUpdate/EditResume";
import UserProvider from "./context/userContext";

const router = createBrowserRouter(
  [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/signUp", element: <SignUp /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/resume/:resumeId", element: <EditResume /> },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

const App = () => {
  return (
    <UserProvider>
      <div>
        <RouterProvider router={router} />
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: { fontSize: "13px" },
        }}
      />
    </UserProvider>
  );
};

export default App;
