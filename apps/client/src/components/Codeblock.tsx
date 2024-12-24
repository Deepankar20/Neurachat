import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "jsx" }) => {
  return (
    <div className="relative  w-1/2 overflow-hidden rounded-lg shadow-lg bg-gray-800">
      <SyntaxHighlighter language={language} style={nightOwl}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
