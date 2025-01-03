import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex">
      <h1 className="text-white font-semibold mr-1">PistonPad</h1>
      <img src="/code.ico" alt="Logo" className="h-6 w-6" />
    </Link>
  );
}

export default Logo;
