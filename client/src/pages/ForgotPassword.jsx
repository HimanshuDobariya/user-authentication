import React, { useState } from "react";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { useAuth } from "../context/Authcontext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { CiMail } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const { loading, setLoading, API_URL } = useAuth();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL}/forgot-password`,
        {
          email,
        },
        { withCredentials: true }
      );

      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        setIsSubmited(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "Error sending reset password email"
      );
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
        <h1 className="text-2xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-3xl mb-4">
          Forgot Password
        </h1>
        {!isSubmited ? (
          <>
            <p className="font-light text-gray-500 text-center">
              Enter your email and we'll send you a link to reset your password.
            </p>

            <form className="space-y-4 md:space-y-6">
              <Input
                label="Email"
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                handleChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <button
                type="submit"
                className="w-full relative flex justify-center"
                onClick={handleSubmitEmail}
              >
                {loading ? <Loader /> : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CiMail className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-800 mb-6">
              If an account exists for {email}, you will receive a password
              reset link shortly.
            </p>
          </div>
        )}

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
};

export default ForgotPassword;
