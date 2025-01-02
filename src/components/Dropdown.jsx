import React, { useState } from "react";
import { LANGUAGE_VERSIONS } from "../utils/constants";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="relative w-48">
        <button
          className="px-2 py-1 bg-gray-800 text-white rounded-md focus:outline-none"
          onClick={handleToggle}
        >
          Supported Languages
        </button>
        {isOpen && (
          <div className="absolute mt-2 w-full bg-[#110c1b] rounded-md shadow-lg z-10">
            {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
              <div key={lang} className="px-4 py-2 text-white">
                {lang}: {version}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
