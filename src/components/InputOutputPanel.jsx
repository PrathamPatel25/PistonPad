import React from "react";
import { Play } from "lucide-react";

const InputOutputPanel = ({
  userInput,
  onInputChange,
  output,
  isLoading,
  isError,
  onRunCode,
}) => {
  return (
    <div className="w-96 bg-[#252526] border-l border-[#1e1e1e] flex flex-col absolute right-0 top-24 bottom-0 z-50">
      <div className="flex-1 p-4 border-b border-[#1e1e1e] min-h-[50%]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300 text-sm font-medium">INPUT</span>
          <button
            onClick={onRunCode}
            disabled={isLoading}
            className="flex items-center px-3 py-1 bg-[#0e639c] hover:bg-[#1177bb] text-white rounded-sm text-sm"
          >
            <Play className="w-4 h-4 mr-1" />
            {isLoading ? "Running..." : "Run"}
          </button>
        </div>
        <textarea
          className="w-full h-[calc(100%-40px)] bg-[#1e1e1e] text-gray-300 p-2 rounded border border-[#2d2d2d] resize-none focus:outline-none focus:border-[#0e639c]"
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Enter input here..."
        />
      </div>

      <div className="flex-1 p-4 min-h-[50%]">
        <span className="text-gray-300 text-sm font-medium">OUTPUT</span>
        <div
          className={`mt-2 p-2 h-[calc(100%-32px)] overflow-auto font-mono text-sm rounded border ${
            isError
              ? "border-red-500 text-red-400"
              : "border-[#2d2d2d] text-gray-300"
          } bg-[#1e1e1e]`}
        >
          {isLoading
            ? "Running..."
            : output
            ? output.map((line, i) => <div key={i}>{line}</div>)
            : 'Click "Run" to see output'}
        </div>
      </div>
    </div>
  );
};

export default InputOutputPanel;
