import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <div
        onClick={() => navigate("/")}
        className="px-6 pb-6 border-b border-gray-200 cursor-pointer"
      >
        <img src={assets.logo} alt="logo" className="w-32" />
      </div>
      <NavLink
        end
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <img src={assets.list_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">My Articles</p>
      </NavLink>

      <NavLink
        to="/dashboard/create"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-primary/10 border-r-4 border-primary"
          }`
        }
      >
        <img src={assets.add_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Create Article</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
