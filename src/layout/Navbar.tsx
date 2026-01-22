import { Search, PenSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {




  return (
    <nav className="w-full flex items-center justify-center px-8 py-6 bg-white">
      <div className="w-4/5 flex items-center justify-between ">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 bg-black"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            ></div>
            <span className="text-xl font-bold">sharexperience.</span>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <Link to="/posts" className="hover:text-black transition  gap-2  py-2">
            Read
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-black transition">
            <Search size={18} />
            <span>Search</span>
          </button>
          <Link to={'/createpost'} className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            <PenSquare size={18} />
            <span>Create Post</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
