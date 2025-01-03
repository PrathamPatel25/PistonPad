import React, { useState } from "react";
import authService from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { motion } from "framer-motion";

function SignupComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 mx-4"
      >
        <div className="bg-gray-800 backdrop-blur-lg bg-opacity-50 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              PistonPad
            </h1>
            <h2 className="text-2xl font-semibold text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Sign In
              </Link>
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4 mb-6"
            >
              <p className="text-red-500 text-center text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(create)} className="space-y-6">
            <div className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                className="bg-gray-700 bg-opacity-50 border border-gray-600 focus:border-blue-500 text-white placeholder-gray-400 rounded-lg"
                {...register("name", { required: "Full Name is required" })}
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                className="bg-gray-700 bg-opacity-50 border border-gray-600 focus:border-blue-500 text-white placeholder-gray-400 rounded-lg"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be valid",
                  },
                })}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="bg-gray-700 bg-opacity-50 border border-gray-600 focus:border-blue-500 text-white placeholder-gray-400 rounded-lg"
                {...register("password", { required: "Password is required" })}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 
                text-white font-medium transition-all duration-200 transform hover:scale-[1.02] 
                ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            By signing up, you agree to our Terms of Service
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SignupComponent;
