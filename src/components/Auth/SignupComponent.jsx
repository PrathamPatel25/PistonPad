import React, { useState } from "react";
import authService from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";

function SignupComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
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
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-gray-950 to-gray-800">
      <div className="mx-auto w-full max-w-lg bg-slate-200 dark:bg-slate-500 rounded-xl p-10 shadow-lg">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">PistonPad</span>
        </div>
        <h2 className="text-center text-2xl font-bold dark:text-white">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-base text-gray-500 dark:text-white">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
          <Input
            label="Full Name:"
            placeholder="Enter your full name"
            {...register("name", { required: "Full Name is required" })}
          />
          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email address must be valid",
              },
            })}
          />
          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          <Button type="submit" className="w-full bg-blue-500 text-white">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignupComponent;
