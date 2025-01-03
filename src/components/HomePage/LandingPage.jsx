import React, { useEffect } from "react";
import { gsap } from "gsap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const handleStartCoding = () => {
    if (authStatus) {
      navigate("/editor");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    // Main text animation
    const letters = ".letter";
    gsap.fromTo(
      letters,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );

    // Code block animation
    gsap.fromTo(
      ".code-block",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      }
    );

    // Icons animation
    gsap.fromTo(
      ".floating-icon",
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 0.7,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(2)",
        delay: 1,
      }
    );
  }, []);

  useEffect(() => {
    // Floating animation for icons
    gsap.to(".floating-icon", {
      y: "10",
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.2,
        from: "random",
      },
    });
  }, []);

  const codeExample = `// Welcome to PistonPad
const runCode = async (code) => {
  const result = await pistonAPI.execute({
    language: "python",
    code: code
  });
  return result;
};

// Start coding now! 🚀`;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden pt-16">
      {" "}
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 opacity-50" />
      {/* Main content */}
      <div className="relative z-10 text-center mt-8">
        {" "}
        {/* Added mt-8 for extra spacing */}
        {/* Logo text */}
        <div className="text-6xl md:text-8xl font-bold mb-8 flex justify-center">
          {"PistonPad".split("").map((letter, index) => (
            <span
              key={index}
              className="letter inline-block hover:text-blue-400 transition-colors duration-300"
              style={{ textShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
            >
              {letter}
            </span>
          ))}
        </div>
        {/* Tagline */}
        <h2 className="text-xl md:text-2xl mb-8 text-blue-300">
          Code. Compile. Create.
        </h2>
        {/* Code block */}
        <div className="code-block bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto mb-8 text-left">
          <pre className="text-sm md:text-base">
            <code className="text-green-400">{codeExample}</code>
          </pre>
        </div>
        {/* CTA Button */}
        <button
          onClick={handleStartCoding}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Start Coding Now
        </button>
      </div>
      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        {["⚡", "🚀", "💻", "⚙️", "📝", "🔥"].map((emoji, index) => (
          <div
            key={index}
            className="floating-icon absolute text-2xl md:text-4xl"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
