import React from "react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black font-mulish">
      <div className="bg-white rounded-xl shadow-xl px-10 py-12 flex flex-col items-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-3 text-center text-gray-800 tracking-wide">
          Sign in to <span
  className="
    bg-gradient-to-r
    from-[#cbb4ff]    /* pastel purple */
    via-[#b7c7f7]     /* pastel blue */
    to-[#baffc9]      /* pastel mint/green */
    bg-clip-text
    text-transparent
    font-bold
  "
>
  CodeX
</span>
        </h1>
        <p className="mb-8 text-base text-gray-500 text-center">
          Learn programming languages with us!
        </p>
          <button
            className="
              cursor-pointer flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow
              hover:scale-105
              hover:shadow-[0_0_12px_4px_rgba(10,10,10,0.5)]
              hover:border hover:border-white
              transition-all duration-200
            "
            onClick={handleGoogleLogin}
          >
          <FaGoogle className="text-xl" />
          Sign in with Google
        </button>
      </div>
      <p className="mt-8 text-gray-400 text-sm">
        © {new Date().getFullYear()} CodeX. All rights reserved.
      </p>
    </div>
  );
};

export default Login;