import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [step, setStep] = useState(3);

  const [loading, setLoading] = useState(false);

  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      {/* Step 1 */}
      {step == 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>

          {/* Email Input */}
          <div
            className="relative flex items-center jsutify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email ? "top-[-20px]" : ""}`}
            >
              Enter Your Email
            </label>
            <input
              type="text"
              id="email"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px]cursor-pointer rounded-2xl mt-[30px]"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
          </button>
        </div>
      )}

      {/* Step 2 */}

      {step == 2 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>

          {/* OTP Input */}
          <div
            className="relative flex items-center jsutify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]"
            onClick={() => setInputClicked({ ...inputClicked, otp: true })}
          >
            <label
              htmlFor="otp"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.otp ? "top-[-20px]" : ""}`}
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setOTP(e.target.value)}
              value={OTP}
            />
          </div>

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px]cursor-pointer rounded-2xl mt-[30px]"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Submit OTP"}
          </button>
        </div>
      )}

      {step == 3 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Reset Password</h2>

          {/* New Password Input */}

          <div
            className="relative flex items-center jsutify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]"
            onClick={() => setInputClicked({ ...inputClicked, newPassword: true })}
          >
            <label
              htmlFor="newPassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.newPassword ? "top-[-20px]" : ""}`}
            >
              Enter New Password
            </label>
            <input
              type="text"
              id="newPassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </div>

          {/* confirm Password Input */}
          <div
            className="relative flex items-center jsutify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]"
            onClick={() => setInputClicked({ ...inputClicked, confirmNewPassword: true })}
          >
            <label
              htmlFor="confirmPassword"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.confirmNewPassword ? "top-[-20px]" : ""}`}
            >
              Confirm New Password
            </label>
            <input
              type="text"
              id="confirmNewPassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={confirmNewPassword}
            />
          </div>

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px]cursor-pointer rounded-2xl mt-[30px]"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Reset Password"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
