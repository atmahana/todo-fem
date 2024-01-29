import { FC } from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <main className="px-6 max-w-[589px] mx-auto">
          <Outlet />
        </main>
      </Suspense>
      <Navbar />
    </>
  );
};

export default Layout;
