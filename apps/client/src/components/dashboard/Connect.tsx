import CodeBlock from "../Codeblock";
import CopyButton from "./Copybutton";
export default function Connect() {
  const codeString = `import Neurachat from "neura-chatlibexample/src/Neurachat";\n\n<Neurachat\n  apiKey="Your_API_Key_Here"\n  theme="orange"\n/>`;

  const copyCode = `import Neurachat from "neura-chatlibexample/src/Neurachat";

  <Neurachat
    apiKey="Your_API_Key_Here"
    theme="orange"
  />`;

  const installString = "bun install neura-chatlibexample@latest";

  return (
    <div className="flex justify-center flex-col gap-[8vh] p-8">
      <div className="flex flex-col gap-[2vh] ">
        <h1 className="text-3xl">Install Our Library : </h1>
        <CopyButton text={installString} />
        <CodeBlock code={installString} language="javascript" />
      </div>

      <div className="flex flex-col gap-[2vh]">
        <h1 className="text-3xl">Use it like this : </h1>
        <CopyButton text={copyCode} />
        <CodeBlock code={codeString} language="javascript" />
      </div>
    </div>
  );
}
