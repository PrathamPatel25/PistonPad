import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Logo() {
  return (
    <Link to="/">
      <motion.div
        className="flex items-center gap-2 group"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Piston
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Pad
          </span>
        </h1>
        <motion.div
          className="relative"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default Logo;
