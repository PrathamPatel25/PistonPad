import React, { useState } from "react";
import { File, Plus, Check, X, Trash2, Edit2 } from "lucide-react";
import { ALLOWED_EXTENSIONS } from "../utils/constants";

const FileExplorer = ({
  files,
  activeFileId,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename,
  setLanguage,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isRenaming, setIsRenaming] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const validateFileName = (name, originalName = "") => {
    if (!name.trim()) {
      return "File name cannot be empty";
    }

    const isDuplicate = files.some(
      (file) =>
        file.fileName.toLowerCase() === name.toLowerCase() &&
        file.fileName !== originalName
    );
    if (isDuplicate) {
      return "A file with this name already exists";
    }

    const hasExtension = ALLOWED_EXTENSIONS.some((ext) =>
      name.toLowerCase().endsWith(ext)
    );
    if (!hasExtension) {
      return `File must end with one of: ${ALLOWED_EXTENSIONS.join(", ")}`;
    }

    return "";
  };

  const handleSubmit = () => {
    const validationError = validateFileName(fileName);
    if (validationError) {
      setError(validationError);
      return;
    }

    onFileCreate(fileName.trim());
    setFileName("");
    setError("");
    setIsCreating(false);
  };

  const handleRename = (file) => {
    const validationError = validateFileName(fileName, file.fileName);
    if (validationError) {
      setError(validationError);
      console.log(validationError);
      alert(validationError);
      return;
    }

    onFileRename(file.fileId, file.$id, fileName.trim());
    setFileName("");
    setError("");
    setIsRenaming(null);
  };

  const startRenaming = (e, file) => {
    e.stopPropagation();
    setIsRenaming(file.fileId);
    setFileName(file.fileName);
    setError("");
  };

  const handleCancel = () => {
    setFileName("");
    setError("");
    setIsCreating(false);
    setIsRenaming(null);
  };

  const handleKeyDown = (e, file = null) => {
    if (e.key === "Enter") {
      if (isRenaming) {
        handleRename(file);
      } else {
        handleSubmit();
      }
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleChange = (e) => {
    setFileName(e.target.value);
    setError("");
  };

  const handleDelete = (e, fileId, appwriteId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this file?")) {
      onFileDelete(fileId, appwriteId);
    }
  };

  return (
    <div className="w-64 bg-[#252526] border-r border-[#1e1e1e] flex flex-col">
      <div className="p-2 flex justify-between items-center border-b border-[#1e1e1e]">
        <span className="text-gray-300 text-sm font-medium">EXPLORER</span>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="p-1 hover:bg-[#2d2d2d] rounded"
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {isCreating && (
          <div className="flex flex-col px-4 py-1 bg-[#37373d]">
            <div className="flex items-center">
              <File className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                value={fileName}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="example.js"
                className="flex-1 bg-transparent text-gray-300 text-sm outline-none"
                autoFocus
              />
              <button
                onClick={handleSubmit}
                className="p-1 hover:bg-[#2d2d2d] rounded ml-1"
                disabled={!fileName.trim()}
              >
                <Check className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-[#2d2d2d] rounded ml-1"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            {error && (
              <div className="text-red-400 text-xs mt-1 mb-1">{error}</div>
            )}
          </div>
        )}
        {files.map((file) => (
          <div
            key={file.fileId}
            onClick={() => {
              onFileSelect(file.fileId);
              setLanguage(file.language);
            }}
            className={`flex items-center px-4 py-1 cursor-pointer group ${
              activeFileId === file.fileId
                ? "bg-[#37373d]"
                : "hover:bg-[#2d2d2d]"
            }`}
          >
            <File className="w-4 h-4 text-gray-400 mr-2" />
            {isRenaming === file.fileId ? (
              <div className="flex items-center flex-1">
                <input
                  type="text"
                  value={fileName}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, file)}
                  className="flex-1 bg-transparent text-gray-300 text-sm outline-none"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={() => handleRename(file)}
                  className="p-1 hover:bg-[#2d2d2d] rounded ml-1"
                  disabled={!fileName.trim()}
                >
                  <Check className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 hover:bg-[#2d2d2d] rounded ml-1"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            ) : (
              <>
                <span className="text-gray-300 text-sm flex-1">
                  {file.fileName}
                </span>
                <div className="invisible group-hover:visible flex">
                  <button
                    onClick={(e) => startRenaming(e, file)}
                    className="p-1 hover:bg-[#3c3c3c] rounded mr-1"
                    title="Rename file"
                  >
                    <Edit2 className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, file.fileId, file.$id)}
                    className="p-1 hover:bg-[#3c3c3c] rounded"
                    title="Delete file"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
