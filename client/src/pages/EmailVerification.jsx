import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import axios from "axios";

const EmailVerification = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { API_URL, setUserData, loading, setLoading, setIsAuthenticated } = useAuth();

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const updatedCode = [...code];

    updatedCode[index] = value;
    setCode(updatedCode);

    if (value && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = async (e) => {
    e.preventDefault();
    const pastedData = (await navigator.clipboard.readText())
      .trim()
      .slice(0, code.length); // Limit to OTP length

    const updatedCode = [...code];
    for (let i = 0; i < pastedData.length; i++) {
      if (isNaN(pastedData[i])) break; // Stop if non-numeric
      updatedCode[i] = pastedData[i];
    }

    setCode(updatedCode);

    // Update focus
    const firstEmptyIndex = updatedCode.findIndex((digit) => digit === "");
    if (firstEmptyIndex !== -1) {
      inputRefs.current[firstEmptyIndex].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API_URL}/verify-email`,
        { code: verificationCode },
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
      toast.error(error.response.data.message || "Error verifying email");
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 sm:px-24 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-8 rounded-xl shadow">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl  font-bold mb-2">
            Email Verification
          </h1>
          <p className="text-[15px] text-slate-500">
            Enter the 6-digit verification code that was sent to your email
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-6">
            <button
              type="submit"
              className="w-full relative flex justify-center"
            >
              {loading ? <Loader /> : "Verify Email"}
            </button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default EmailVerification;
