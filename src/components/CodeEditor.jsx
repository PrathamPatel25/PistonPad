import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import Dropdown from "./Dropdown";
import { Save } from "lucide-react";
import JSZip from "jszip";

const CodeEditor = ({
  file,
  language,
  onCodeChange,
  editorRef,
  onSave,
  isSaving,
}) => {
  const [saveStatus, setSaveStatus] = useState("");

  const handleSave = async () => {
    try {
      setSaveStatus("saving");
      await onSave?.(file);
      setSaveStatus("saved");

      setTimeout(() => {
        setSaveStatus("");
      }, 2000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => {
        setSaveStatus("");
      }, 3000);
    }
  };

  const handleExport = async () => {
    try {
      if (!file || !file.fileId) {
        console.error("No file selected for export.");
        return;
      }

      // Create a zip instance
      const zip = new JSZip();
      zip.file(file.fileName || "exported_file.txt", file.content || "");

      // Generate the zip file as a blob
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Create a download link and trigger the download
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${file.fileName || "exported_file"}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting file:", error);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="flex-1 flex flex-col" onKeyDown={handleKeyDown}>
      <div className="p-2 bg-[#252526] h-10 border-b border-[#1e1e1e] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Dropdown />
          <button
            onClick={handleSave}
            disabled={isSaving || saveStatus === "saving"}
            className={`px-3 py-1 rounded flex items-center space-x-2 text-sm ${
              saveStatus === "saving"
                ? "bg-yellow-600 text-white cursor-wait"
                : saveStatus === "saved"
                ? "bg-green-600 text-white"
                : saveStatus === "error"
                ? "bg-red-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>
              {saveStatus === "saving"
                ? "Saving..."
                : saveStatus === "saved"
                ? "Saved!"
                : saveStatus === "error"
                ? "Error saving"
                : "Save"}
            </span>
          </button>
          <button
            onClick={handleExport}
            className={`px-3 py-1 rounded flex items-center space-x-2 text-sm bg-blue-600 hover:bg-blue-700 text-white`}
          >
            Export
          </button>
        </div>
        <div className="text-sm text-gray-400">
          {file?.fileName} - {file?.language}
        </div>
        {/* {console.log(file)} */}
      </div>
      <div className="flex-1 relative">
        <Editor
          options={{
            minimap: {
              enabled: true,
              autohide: false,
              scale: 1,
              size: "fit",
              showSlider: "mouseover",
              side: "right",
            },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
          }}
          height="100%"
          width="100%"
          theme="vs-dark"
          language={
            file.language === "c++"
              ? "cpp"
              : file.language === "typeScript"
              ? "typescript"
              : file.language
          }
          value={file.content}
          onMount={(editor) => {
            editorRef.current = editor;
            editor.focus();
            monaco.editor.EditorZoom.setZoomLevel(-1);
          }}
          onChange={(value) => {
            onCodeChange?.(value);
            if (saveStatus === "saved") {
              setSaveStatus("");
            }
          }}
          loading={<div className="text-gray-400">Loading editor...</div>}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
