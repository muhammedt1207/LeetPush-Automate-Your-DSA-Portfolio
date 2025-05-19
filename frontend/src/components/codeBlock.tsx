import { useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import type { Ace } from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp'; 
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-rust';

import 'ace-builds/src-noconflict/theme-monokai';

interface CodeBlockProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}

export default function CodeBlock({ code, setCode, language, setLanguage }: CodeBlockProps) {
  const editorRef = useRef<AceEditor>(null);

  const languageOptions = [
    { display: 'JavaScript', value: 'javascript' },
    { display: 'TypeScript', value: 'typescript' },
    { display: 'Python', value: 'python' },
    { display: 'Java', value: 'java' },
    { display: 'C/C++', value: 'c_cpp' },
    { display: 'Ruby', value: 'ruby' },
    { display: 'Rust', value: 'rust' },
    { display: 'Go', value: 'golang' },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor as Ace.Editor;
      editor.resize(true);
    }
  }, [code]);

  return (
    <div className="bg-[#2c364c] p-4 rounded-lg ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-white flex items-center">
          <span className="mr-2"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#d57433"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-code"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" /></svg>
          </span> Solution Code
        </h2>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-gray-700 text-white p-1 rounded focus:outline-none"
        >
          {languageOptions.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.display}
            </option>
          ))}
        </select>
      </div>

      <AceEditor
        ref={editorRef}
        mode={language} 
        theme="monokai" 
        value={code}
        onChange={(newCode) => setCode(newCode)}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          fontSize: 14,
          showPrintMargin: false,
        }}
        style={{
          width: '100%',
          minHeight: '300px',
          backgroundColor: '#1E1E1E', 
          borderRadius: '0.5rem',
        }}
      />
    </div>
  );
}