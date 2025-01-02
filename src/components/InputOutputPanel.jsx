import React, { useState } from "react";
import { Play, Loader2, X, Maximize2, Minimize2, Trash2 } from "lucide-react";

const InputOutputPanel = ({
  userInput,
  onInputChange,
  output,
  isLoading,
  isError,
  onRunCode,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const handleClearInput = () => {
    onInputChange("");
  };

  return (
    <div
      className={`fixed right-0 top-24 z-50 flex h-[calc(100vh-7rem)] transition-transform duration-300 ease-in-out ${
        isPanelVisible ? "translate-x-0" : "translate-x-[calc(100%-32px)]"
      }`}
    >
      <button
        onClick={() => setIsPanelVisible(!isPanelVisible)}
        className="w-6 h-20 flex items-center justify-center bg-[#252526] border-l border-y border-[#1e1e1e] rounded-l-md hover:bg-[#2d2d2d] transition-colors"
      >
        <span className="text-gray-300 text-sm font-medium [writing-mode:vertical-lr] rotate-180">
          {isPanelVisible ? "Hide" : "Show"}
        </span>
      </button>

      <div className="w-80 bg-[#252526] border-l border-[#1e1e1e] flex flex-col h-full">
        <div className="px-4 py-2 border-b border-[#1e1e1e] flex justify-between items-center">
          <span className="text-gray-300 font-medium">Console</span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-[#2d2d2d] rounded"
              title={isExpanded ? "Minimize" : "Maximize"}
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4 text-gray-400" />
              ) : (
                <Maximize2 className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <button
              onClick={() => setIsPanelVisible(false)}
              className="p-1 hover:bg-[#2d2d2d] rounded"
              title="Close"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div
          className={`p-4 border-b border-[#1e1e1e] transition-all duration-300 ${
            isExpanded ? "h-1/2" : "h-[30%]"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-300 text-sm font-medium">INPUT</span>
              <button
                onClick={handleClearInput}
                className="p-1 hover:bg-[#2d2d2d] rounded text-gray-400 hover:text-gray-300 transition-colors"
                title="Clear input"
                disabled={!userInput}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={onRunCode}
              disabled={isLoading}
              className="flex items-center px-3 py-1 bg-[#0e639c] hover:bg-[#1177bb] text-white rounded-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-1" />
              )}
              {isLoading ? "Running..." : "Run"}
            </button>
          </div>
          <textarea
            className="w-full h-[calc(100%-40px)] bg-[#1e1e1e] text-gray-300 p-2 rounded border border-[#2d2d2d] resize-none focus:outline-none focus:border-[#0e639c] transition-colors"
            value={userInput}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter input here..."
          />
        </div>

        <div
          className={`p-4 transition-all duration-300 ${
            isExpanded ? "h-1/2" : "h-[70%]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm font-medium">OUTPUT</span>
          </div>
          <div
            className={`mt-2 p-2 h-[calc(100%-32px)] overflow-auto font-mono text-sm rounded border ${
              isError
                ? "border-red-500 bg-red-500/10 text-red-400"
                : "border-[#2d2d2d] bg-[#1e1e1e] text-gray-300"
            } transition-colors`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2 text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                Running...
              </div>
            ) : output ? (
              output.map((line, i) => (
                <div key={i} className="font-mono">
                  {line}
                </div>
              ))
            ) : (
              <span className="text-gray-500">Click "Run" to see output</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputOutputPanel;
