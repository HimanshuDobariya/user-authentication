import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const { API_URL, setUserData, loading, setLoading, setIsAuthenticated } =
    useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL}/login`,
        {
          email: loginData.email,
          password: loginData.password,
        },
        { withCredentials: true }
      );

      if (data.success) {
        setUserData(data.user);
        setIsAuthenticated(true);
        setLoading(false);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error in Login");
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 sm:px-24">
      <img
        src={assets.logo}
        alt="logo"
        className="w-32 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="p-6 mt-10 sm:mt-16  space-y-4 md:space-y-6 sm:p-8 sm:max-w-md mx-auto bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl mb-4">
          WelCome Back
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Your Email"
            name="email"
            value={loginData.email}
            handleChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Your Password"
            name="password"
            value={loginData.password}
            handleChange={handleChange}
          />

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="w-full relative flex justify-center">
            {loading ? <Loader /> : "Login"}
          </button>
          <p className="text-sm font-light text-center">
            Don’t have an account yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
