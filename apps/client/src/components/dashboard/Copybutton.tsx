import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyButtonSVG from './Copybuttonsvg';

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative flex items-center">
      <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
        <button
          className="px-2 py-2 bg-[#011627] text-white rounded-lg hover:bg-[#080c0f] focus:outline-none transition duration-200 ease-in-out"
        >
          {copied ? 'Copied!' : <CopyButtonSVG/>}
        </button>
      </CopyToClipboard>
      <span
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 text-sm font-medium ${copied ? 'text-green-500' : 'text-transparent'}`}
      >
        {copied ? 'Copied to clipboard!' : ''}
      </span>
    </div>
  );
};

export default CopyButton;
