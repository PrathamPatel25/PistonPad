import { LANGUAGE_VERSIONS } from "./constants";

const BASE_URL = "https://emkc.org/api/v2/piston";

export const executeCode = async (language, sourceCode, input) => {
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [{ content: sourceCode }],
      stdin: input,
    }),
  });

  if (!response.ok) {
    throw new Error("Error executing code");
  }
  return await response.json();
};
