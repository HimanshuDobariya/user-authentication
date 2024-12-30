import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaArrowLeft } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const { API_URL, loading, setLoading } = useAuth();

  const resetPassword = async (password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL}/reset-password/${token}`,
        {
          password,
        },
        { withCredentials: true }
      );
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error reset password");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password Not Match");
      return;
    }
    await resetPassword(password);
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
        <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-3xl mb-4">
          Reset Password
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <Input
            label="New Password"
            type="password"
            placeholder="New Password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="w-full relative flex justify-center">
            {loading ? <Loader /> : "Reset Password"}
          </button>
        </form>

        <div className="flex justify-center">
          <Link
            to={"/login"}
            className="text-sm text-blue-600 hover:underline flex items-center"
          >
            <FaArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
  return <div>ResetPassword</div>;
};

export default ResetPassword;
