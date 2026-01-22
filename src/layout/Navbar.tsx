import {  PenSquare, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

interface NavbarProps {
  user?: GoogleUser | null;
}

const Navbar = ({ user }: NavbarProps) => {

  const handleLogout = () => {
    localStorage.removeItem("googleToken");
    window.location.href = "/";
  };

  return (
    <nav className="w-full flex items-center justify-center px-8 py-6 bg-white border-b">
      <div className="w-4/5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div
            className="w-6 h-6 bg-black"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>
          <span className="text-xl font-bold">sharexperience.</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/posts" className="hover:text-black transition gap-2 py-2">
            Read
          </Link>

          {user ? (
            <>
              <Link
                to="/createpost"
                className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                <PenSquare size={18} />
                <span>Create Post</span>
              </Link>
              <div className="flex items-center gap-3 pl-4 border-l">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 transition"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;