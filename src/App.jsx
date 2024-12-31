import React, { useState, useRef, useEffect } from "react";
import FileExplorer from "./components/FileExplorer";
import CodeEditor from "./components/CodeEditor";
import InputOutputPanel from "./components/InputOutputPanel";
import { executeCode } from "./utils/api";
import appwriteService from "./appwrite/config";
import { ID } from "appwrite";
import { EXTENSION_TO_LANGUAGE } from "./utils/constants";

const App = () => {
  const editorRef = useRef();
  const [files, setFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState(null);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [language, setLanguage] = useState("c++");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        const documents = await appwriteService.getFiles();

        if (documents && documents.length > 0) {
          setFiles(documents);
          setActiveFileId(documents[0].fileId);
          setLanguage(documents[0].language);
        } else {
          handleFileCreate();
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  function getLanguageFromFileName(fileName) {
    const extension = fileName.split(".").pop();
    return EXTENSION_TO_LANGUAGE[extension] || "Unknown language";
  }

  const handleFileCreate = async (fileName) => {
    try {
      const appwriteId = ID.unique();

      const lang = getLanguageFromFileName(fileName);
      console.log(lang);

      await appwriteService.createFile({
        fileId: appwriteId,
        appwriteId,
        fileName,
        content: "",
        language: lang,
      });

      setFiles((prev) => [
        ...prev,
        {
          fileId: appwriteId,
          fileName,
          content: "",
          language: lang,
          $id: appwriteId,
        },
      ]);

      setActiveFileId(appwriteId);
      setLanguage(lang);
    } catch (error) {
      console.error("Error creating file:", error);
    }
  };

  const activeFile = files.find((f) => f.fileId === activeFileId);

  const handleFileDelete = async (fileId, appwriteId) => {
    try {
      await appwriteService.deleteFile(appwriteId);
      setFiles(files.filter((file) => file.fileId !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleFileRename = async (fileId, appwriteId, newFileName) => {
    try {
      const file = files.find((f) => f.fileId === fileId);
      console.log(file);

      const lang = getLanguageFromFileName(newFileName);

      console.log(lang);

      if (!file) return;

      await appwriteService.updateFile(appwriteId, {
        fileId: file.fileId,
        fileName: newFileName,
        content: file.content,
        language: lang,
      });

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.fileId === fileId
            ? { ...f, fileName: newFileName, language: lang }
            : f
        )
      );
      console.log(file);
      setLanguage(lang);
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  const handleFileSave = async (file) => {
    try {
      if (!file?.$id) return;
      console.log(file);

      await appwriteService.updateFile(file.$id, {
        fileId: file.fileId,
        fileName: file.fileName,
        content: file.content,
        language: file.language,
      });

      return true;
    } catch (error) {
      console.error("Error saving file:", error);
      throw error;
    }
  };

  const handleCodeChange = async (value) => {
    try {
      const fileToUpdate = files.find((f) => f.fileId === activeFileId);
      if (!fileToUpdate) return;

      const updatedFiles = files.map((f) =>
        f.fileId === activeFileId ? { ...f, content: value } : f
      );
      setFiles(updatedFiles);

      await appwriteService.updateFile(fileToUpdate.$id, {
        fileId: fileToUpdate.fileId,
        fileName: fileToUpdate.fileName,
        content: value,
        language: fileToUpdate.language,
      });
    } catch (error) {
      console.error("Error updating file:", error);
    }
  };

  const handleRunCode = async () => {
    if (!editorRef.current) return;

    setIsLoading(true);
    try {
      const { run: result } = await executeCode(
        language,
        editorRef.current.getValue(),
        userInput
      );
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error("Error running code:", error);
      setOutput(["Error executing code"]);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && files.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1e1e1e]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e]">
      <div className="h-12 bg-[#2d2d2d] flex items-center justify-between px-4 border-b border-[#1e1e1e]">
        <div className="flex items-center space-x-2">
          <h1 className="text-white font-semibold">PistonPad</h1>
          <img src="/code.ico" alt="Logo" className="h-6 w-6" />
        </div>
      </div>

      <div className="flex-1 flex">
        <FileExplorer
          files={files}
          activeFileId={activeFileId}
          onFileSelect={setActiveFileId}
          onFileCreate={handleFileCreate}
          onFileDelete={handleFileDelete}
          onFileRename={handleFileRename}
          setLanguage={setLanguage}
        />

        {activeFile && (
          <CodeEditor
            file={activeFile}
            language={language}
            onCodeChange={handleCodeChange}
            onSave={handleFileSave}
            editorRef={editorRef}
            isSaving={isLoading}
          />
        )}

        <InputOutputPanel
          userInput={userInput}
          onInputChange={setUserInput}
          output={output}
          isLoading={isLoading}
          isError={isError}
          onRunCode={handleRunCode}
        />
      </div>
    </div>
  );
};

export default App;
