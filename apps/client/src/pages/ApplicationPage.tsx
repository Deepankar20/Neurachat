import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import CopyButton from "../components/dashboard/Copybutton";

type app = {
  id: string;
  name: string;
  userId: string;
  context: string;
  apiKey: string;
  createdAt: string;
  updatedAt: string;
};

export default function ApplicationPage() {
  const { id } = useParams();

  const [app, setApp] = useState<app | undefined>();

  useEffect(() => {
    async function fetchApp() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/app/getApp?appId=${id}`
        );

        const data = await response.json();
        setApp(data.data);
      } catch (error) {
        console.log("Error getting app");
      }
    }

    fetchApp();
  }, []);

  return (
    <div>
      <Navbar />

      {app && (
        <div className="p-[10vh] flex flex-col gap-[8vh] ">
          {app && <h1 className="text-[10vh]">{app.name}</h1>}

          <div className="flex flex-col gap-2 p-[2vh]">
            <h1 className="text-[5vh]">Context : </h1>
            <div>{app.context}</div>
          </div>

          <div className="flex flex-col gap-[2vh] p-[2vh]">
            <p>API Key :</p>

            <div className="flex flex-col gap-4">
              <CopyButton text={app.apiKey} />
              <input
                className="p-[0.75rem] border rounded-md bg-[#1a1a1a] text-2xl hover:cursor-pointer hover:border-[0.15rem] w-1/2"
                type="password"
                contentEditable="false"
                value={app.apiKey}
                readOnly
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
