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
        <main className="px-6 md:max-w-[589px] 2xl:max-w-[748px] mx-auto flex flex-col gap-4 md:gap-6">
          <TodoForm />
          <Outlet />
        </main>
      </Suspense>
      <Navbar />
      <div className="text-xs md:text-sm text-center absolute -translate-x-1/2 left-1/2 bottom-10">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW" target="_blank" className="text-primary">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/atmahana" className="text-primary">Zubair Adham</a>.
      </div>
    </>
  );
};

export default Layout;
