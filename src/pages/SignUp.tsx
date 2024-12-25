import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import axios from "axios";
import { Navigate } from "react-router-dom";
const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (isOtpSent) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOtpSent]);
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { name, email, dob, password }
      );
      if (response.status == 200) {
        setIsOtpSent(true);
      }

      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send OTP");
    }
  };
  if (redirect) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="grid grid-cols-1  lg:grid-cols-2 w-10/12 bg-white shadow-lg rounded-lg">
        <div className="p-6 ">
          {" "}
          <div className="relative max-w-lg mx-auto p-24 bg-white">
            <div className="absolute inline-flex p-12 items-center top-0 left-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z"
                  fill="#367AFF"
                />
                <path
                  d="M22.3777 17.7771C22.107 18.9176 21.5356 19.9421 20.7515 20.763L27.1034 27.0935L29.4147 24.7901L22.3777 17.7771Z"
                  fill="#367AFF"
                />
                <path
                  d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z"
                  fill="#367AFF"
                />
                <path
                  d="M17.6481 22.5819C17.1263 22.7156 16.5794 22.7866 16.0158 22.7866C15.412 22.7866 14.8273 22.705 14.2722 22.5523L11.9587 31.1569L15.1159 32L17.6481 22.5819Z"
                  fill="#367AFF"
                />
                <path
                  d="M14.1608 22.5205C13.0533 22.1945 12.0683 21.584 11.291 20.7739L4.92334 27.1199L7.23454 29.4233L14.1608 22.5205Z"
                  fill="#367AFF"
                />
                <path
                  d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z"
                  fill="#367AFF"
                />
              </svg>
              <p className="font-bold">HD</p>
            </div>
            {isOtpSent && (
              <p className="text-green-500">OTP sent successfuly!</p>
            )}
            <h1 className="text-2xl font-bold text-gray-900">Sign up</h1>
            <p className="text-sm text-gray-600 mb-6">
              Sign up to enjoy the feature of HD
            </p>

            <InputField
              label="Your Name"
              type="text"
              value={name}
              palceholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              label="Date of Birth"
              type="date"
              value={dob}
              palceholder="Enter your DOB"
              onChange={(e) => setDob(e.target.value)}
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              palceholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="OTP"
              type="password"
              value={password}
              palceholder="Enter OTP"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button text="Sign up" onClick={handleSignUp} />
            <div className="flex items-center justify-center mt-6">
              <span className="text-sm text-gray-500">or</span>
            </div>
            <button
              type="button"
              className="w-full mt-4 text-black bg-gray-50 hover:bg-gray-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mb-2"
            >
              Sign in with Google
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.16 12.1932C20.16 11.5905 20.1059 11.011 20.0055 10.4546H12V13.7425H16.5746C16.3775 14.8051 15.7786 15.7053 14.8784 16.308V18.4407H17.6255C19.2327 16.961 20.16 14.7819 20.16 12.1932Z"
                  fill="#4285F4"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 20.5C14.295 20.5 16.2191 19.7389 17.6254 18.4407L14.8784 16.3079C14.1173 16.8179 13.1436 17.1193 12 17.1193C9.78611 17.1193 7.91224 15.6241 7.24383 13.615H4.40405V15.8173C5.80269 18.5952 8.67724 20.5 12 20.5Z"
                  fill="#34A853"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.24387 13.6151C7.07387 13.1051 6.97728 12.5603 6.97728 12.0001C6.97728 11.4399 7.07387 10.8951 7.24387 10.3851V8.1828H4.40409C3.82841 9.3303 3.5 10.6285 3.5 12.0001C3.5 13.3717 3.82841 14.6699 4.40409 15.8174L7.24387 13.6151Z"
                  fill="#FBBC05"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 6.88075C13.2479 6.88075 14.3684 7.30961 15.2493 8.15189L17.6873 5.71393C16.2152 4.34234 14.2911 3.50006 12 3.50006C8.67724 3.50006 5.80269 5.40484 4.40405 8.1828L7.24383 10.3851C7.91224 8.37598 9.78611 6.88075 12 6.88075Z"
                  fill="#EA4335"
                />
              </svg>
            </button>
            <p className="text-sm text-gray-500 gap-1 text-center mt-4">
              Already have an account??{""}
              <a
                aria-label="sign in form"
                href="/signin"
                className="text-blue-600 underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
        <div className="hidden lg:block rounded-xl">
          <img
            src="/right.png"
            alt="Signup "
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};
export default SignUp;
