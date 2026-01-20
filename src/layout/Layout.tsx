import type { ReactNode, JSX } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
