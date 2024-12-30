import React from "react";
import { assets } from "../assets/assets";
import { useAuth } from "../context/Authcontext";

const Header = () => {
  const { userData } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center text-center mt-10">
      <img
        src={assets.home_img}
        alt=""
        className="w-36 h-36 mix-blend-multiply"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl mb-4 mt-2">
        Hey {userData ? userData?.username : "Developer"}
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square" />
      </h1>
      <h2 className="text-3xl sm:text-5xl mb-4 font-semibold">
        Welcome To Our App
      </h2>
      <p className="max-w-md text-center mb-8">
        Let's start with quick product tour and we will have you up and running
        in no time!
      </p>
      <button
        type="button"
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
