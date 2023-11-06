import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "./Header";

const Layout: FunctionComponent = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <main className="px-6">
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default Layout;
