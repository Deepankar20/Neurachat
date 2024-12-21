import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("connect"); // Default active tab

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar />

      <div className="flex">
        <div className="w-1/5 h-[90vh] flex flex-col gap-[1rem] p-[1rem] border-r border-[#1a1a1a]">
          <button
            onClick={() => handleTabClick("connect")}
            className={`p-[1rem] rounded-xl ${
              activeTab === "connect"
                ? "bg-white text-black"
                : "bg-[#1a1a1a] hover:bg-slate-100 hover:text-black"
            }`}
          >
            Connect
          </button>

          <button
            onClick={() => handleTabClick("api")}
            className={`p-[1rem] rounded-xl ${
              activeTab === "api"
                ? "bg-white text-black"
                : "bg-[#1a1a1a] hover:bg-slate-100 hover:text-black"
            }`}
          >
            API
          </button>

          <button
            onClick={() => handleTabClick("analysis")}
            className={`p-[1rem] rounded-xl ${
              activeTab === "analysis"
                ? "bg-white text-black"
                : "bg-[#1a1a1a] hover:bg-slate-100 hover:text-black"
            }`}
          >
            Analysis
          </button>
        </div>

        <div className="w-3/4 p-4">
          {activeTab === "connect" && <div>Connect Content</div>}
          {activeTab === "api" && <div>API Content</div>}
          {activeTab === "analysis" && <div>Analysis Content</div>}
        </div>
      </div>
    </div>
  );
}
