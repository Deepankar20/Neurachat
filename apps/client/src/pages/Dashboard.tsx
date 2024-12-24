import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Apps from "../components/dashboard/Apps";
import Connect from "../components/dashboard/Connect";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("connect"); // Default active tab
  const navigate = useNavigate();

  const user = useAuth();

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (!user.userId) {
      navigate("/");
    }
  }, []);

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
            App
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
          {activeTab === "connect" && <Connect />}
          {activeTab === "api" && <Apps />}
          {activeTab === "analysis" && <div>Coming Soon...</div>}
        </div>
      </div>
    </div>
  );
}
