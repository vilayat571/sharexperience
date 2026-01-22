import type { ReactNode, JSX } from "react";
import Navbar from "./Navbar";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

interface LayoutProps {
  children: ReactNode;
  user?: GoogleUser | null;
}

const Layout = ({ children, user }: LayoutProps): JSX.Element => {
  return (
    <div className="w-full">
      <Navbar user={user} />
      {children}
    </div>
  );
};

export default Layout;