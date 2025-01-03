import React from "react";
import { Loader2 } from "lucide-react";

function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 bg-opacity-50">
      <div className="flex flex-col items-center space-y-4 p-8 rounded-lg bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl">
        {/* Loader icon with pulsing ring */}
        <div className="relative">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          <div className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-20" />
        </div>

        {/* Loading text with gradient */}
        <div className="relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 font-medium text-lg">
            {text}
          </span>
          {/* Optional subtle dot animation */}
          <span className="text-blue-400 animate-bounce inline-block ml-1">
            .
          </span>
          <span className="text-blue-400 animate-bounce inline-block ml-0.5 animation-delay-200">
            .
          </span>
          <span className="text-blue-400 animate-bounce inline-block ml-0.5 animation-delay-400">
            .
          </span>
        </div>
      </div>
    </div>
  );
}

// Add a small keyframes style for the animation delay
const style = document.createElement("style");
style.textContent = `
  .animation-delay-200 {
    animation-delay: 200ms;
  }
  .animation-delay-400 {
    animation-delay: 400ms;
  }
`;
document.head.appendChild(style);

export default Loader;
