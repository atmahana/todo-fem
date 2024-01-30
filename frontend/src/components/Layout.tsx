import { FC } from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import TodoForm from "./Todos/TodoForm";
import Loader from "./Loader";

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <main className="px-6 max-w-[589px] mx-auto flex flex-col gap-4 md:gap-6">
          <TodoForm />
          <Outlet />
        </main>
      </Suspense>
      <Navbar />
    </>
  );
};

export default Layout;
