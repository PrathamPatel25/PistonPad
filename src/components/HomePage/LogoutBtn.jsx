import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
    navigate("/");
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 dark:text-white rounded-full text-black hover:bg-slate-200 dark:hover:bg-slate-700"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}
