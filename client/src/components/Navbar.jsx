import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Avatar from "react-avatar";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { API_URL, userData, setLoading, setIsAuthenticated, isAuthenticated } =
    useAuth();

  const logout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/logout`, null, {
        withCredentials: true,
      });

      if (data.success) {
        setIsAuthenticated(false);
        setLoading(false);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <img
        src={assets.logo}
        alt="logo"
        className="w-32 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />

      <div className="flex items-center gap-2">
        {isAuthenticated && userData && (
          <Avatar
            name={userData?.username}
            size="40"
            round={true}
            className="cursor-pointer"
          />
        )}

        {!isAuthenticated ? (
          <button
            className="mb-0"
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
            <FaArrowRight />
          </button>
        ) : (
          <button className="mb-0" type="button" onClick={logout}>
            Logout
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
