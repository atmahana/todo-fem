import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, { loader } from "./routes/Home";
import ActivePage from "./routes/Active";
import CompletedPage from "./routes/Completed";
import Layout from "./components/Layout";
import { ThemeProvider } from "./ThemeContext";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: () => loader(),
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
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
