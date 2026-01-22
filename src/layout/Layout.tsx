import type { ReactNode, JSX } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className="w-full ">
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
