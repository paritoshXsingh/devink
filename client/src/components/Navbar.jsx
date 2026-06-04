import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token, user, logout } = useAppContext();

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="logo"
          className="w-32 sm:w-44 cursor-pointer"
        />

        {token && user ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition"
            >
              Dashboard
            </button>

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
    </div>
  );
};

export default Navbar;
