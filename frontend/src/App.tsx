import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "./routes/Home";
import ActivePage from "./routes/Active";
import Layout from "./components/Layout";
import SignInPage from "./routes/SignIn";
import SignUpPage from "./routes/SignUp";
import CompletedPage from "./routes/Completed";
import { ThemeProvider } from "./ThemeContext";
import { queryClient } from "./lib/queryClient";
import ErrorFallback from "./components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/active",
        element: <ActivePage />,
      },
      {
        path: "/completed",
        element: <CompletedPage />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
