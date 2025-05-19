"use client";

import React, { useState } from "react";
import CodeBlock from "../components/codeBlock";

export default function Home() {
  const [questionNumber, setQuestionNumber] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      if (!questionNumber.trim()) {
        setMessage("Question number is required");
        return;
      }
      if (!questionName.trim()) {
        setMessage("Question name is required");
        return;
      }
      if (!questionDescription.trim()) {
        setMessage("Question description is required");
        return;
      }
      if (!code.trim()) {
        setMessage("Solution code is required");
        return;
      }
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/save-solution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionNumber,
          questionName,
          questionDescription,
          notes,
          code,
          language,
        }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Failed to save solution");
      console.error("Error saving solution:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#272f3f]">
        <svg
          className="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="#d57433"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="#d57433"
            d="M4.93 4.93a10 10 0 0 1 14.14 14.14l-1.41-1.41a8 8 0 1 0-11.31-11.31L4.93 4.93z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#272f3f]">
    
     
      <div className="flex justify-between p-6 bg-[#2c364c] items-center mb-6">
        <h1 className="text-2xl text-white font-bold flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d57433"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-code"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 8l-4 4l4 4" />
            <path d="M17 8l4 4l-4 4" />
            <path d="M14 4l-4 16" />
          </svg>
          LeetCode GitHub Automator
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-green-500">Authenticated</span>
          <button className="text-white bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
            Logout
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex md:flex-row flex-col-reverse  w-full gap-6 px-10">
        {/* Solution Details */}
        <div className="bg-[#2c364c] p-4 w-full md:w-5/12 rounded-lg shadow-lg border border-[#424f69]">
          <h2 className="text-lg text-white mb-4 flex font-bold items-center">
            <span className="mr-2 text-blue-500 font-normal">≡</span> Solution Details
          </h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/3">
                <label className="text-white text-sm">Question #</label>
                <input
                  type="text"
                  placeholder="e.g. 217"
                  value={questionNumber}
                  onChange={(e) => setQuestionNumber(e.target.value)}
                  className="w-full p-2 bg-gray-800 text-gray-400 border border-[#444c5a] rounded focus:outline-none"
                />
              </div>
              <div className="w-2/3">
                <label className="text-white text-sm">Question Name</label>
                <input
                  type="text"
                  placeholder="e.g. Contains Duplicate"
                  value={questionName}
                  onChange={(e) => setQuestionName(e.target.value)}
                  className="w-full p-2 bg-gray-800 text-gray-400 border border-[#444c5a] rounded focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-white text-sm">Question Description</label>
              <textarea
                placeholder="Paste the question description here..."
                value={questionDescription}
                onChange={(e) => setQuestionDescription(e.target.value)}
                className="w-full p-2 bg-gray-800 text-gray-400 border border-[#444c5a] rounded h-32 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-white text-sm">Notes (Optional)</label>
              <textarea
                placeholder="Add your notes, approach, or complexity analysis..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 bg-gray-800 text-gray-400 rounded border-[#444c5a] border h-24 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSave}
              className="w-full py-3 bg-[#28be8c] text-white rounded flex items-center justify-center hover:bg-green-600"
            >
              <span className="mr-2">💾</span> Save & Push to GitHub
            </button>
            {message && (
              <p
                className={`mt-2 ${
                  message.includes("Failed") || message.includes("required")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Solution Code */}
        <div className="bg-[#2c364c] border-[#424f69] border p-4 flex-1 rounded-lg shadow-lg">
          <CodeBlock
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
          />
        </div>
      </div>

      {/* Recent Activity and GitHub Preview */}
      <div className="flex md:flex-row flex-col-reverse gap-6 mt-6 px-10">
        {/* Recent Activity */}
        <div className="bg-[#2c364c] border-[#424f69] border w-full md:w-5/12 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg text-white mb-4">Recent Activity</h2>
          <div className="flex justify-center items-center h-full flex-col">
            <p className="text-white">No activity yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Submit your first solution to see it here
            </p>
          </div>
        </div>

        {/* GitHub Preview */}
        <div className="bg-[#2c364c] border-[#424f69] border flex-1 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg text-white mb-4 flex font-bold items-center">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
            </span>{" "}
            GitHub Preview
          </h2>
          {questionNumber && questionName ? (
            <div className="flex gap-4">
              <div className="bg-gray-900 p-3 flex-1 rounded mb-3">
                <h3 className="text-white font-bold">📜 readme.md</h3>
                <p className="text-white text-sm mt-1">
                  # {questionNumber}. {questionName}
                </p>
                <p className="text-white text-sm mt-1">
                  ## Problem:
                  <br />
                  {questionDescription || "No description provided"}
                </p>
                <p className="text-white text-sm mt-1">
                  ## Notes:
                  <br />
                  {notes || "N/A"}
                </p>
              </div>
              <div className="bg-gray-900 flex-1 p-3 rounded">
                <h3 className="text-white font-bold">
                  📜 solution.
                  {language === "javascript"
                    ? "js"
                    : language === "typescript"
                    ? "ts"
                    : language}
                </h3>
                <pre className="text-white text-sm mt-1">
                  {code || "// No code provided"}
                </pre>
              </div>
            </div>
          ) : (
            <p className="text-white">
              Fill in the solution details to see the preview
            </p>
          )}
        </div>
      </div>
      
      
    </div>
  );
}