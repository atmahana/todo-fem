import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout: FunctionComponent = () => {
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
