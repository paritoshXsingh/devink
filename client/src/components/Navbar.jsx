import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token, user, logout } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
      />
      {token && user ? (
        <div className="flex items-center gap-4">
          <p className="font-medium text-gray-700">Hello, {user.name}</p>

          <button
            onClick={logout}
            className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-8 py-2.5"
        >
          Login
          <img src={assets.arrow} className="w-3" alt="arrow" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
