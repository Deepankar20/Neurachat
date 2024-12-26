import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type app = {
  id: string;
  name: string;
  userId: string;
  context: string;
  apiKey: string;
  createdAt: string;
  updatedAt: string;
};

export default function Apps() {
  const user = useAuth();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [appName, setAppName] = useState<string>("");
  const [appContext, setAppContext] = useState<string>("");
  const [apps, setApps] = useState<app[]>([]);
  const [loading, setLoading] = useState(false);
  const handleToggle = () => {
    // console.log(user.userId);

    setShowDialog((_prev) => !_prev);
  };

  async function createApp() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/app/createApp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify content type as JSON
          },
          body: JSON.stringify({
            name: appName,
            context: appContext,
            userid: user.userId,
          }),
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to create app: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data) {
        return;
      }

      navigate(`/application/${data.data.id}`);
    } catch (error) {
      console.log(`An error occured while creating : ${error}`);
    }
  }

  function handleFormSubmit(e: any) {
    e.preventDefault();

    createApp();
    // console.log({appContext, appName, userId : user.userId});
  }
  // const apps = [
  //   { id: "1", name: "name1" },
  //   { id: "2", name: "name2" },
  // ];

  useEffect(() => {
    async function fetchAllApps() {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/app/getAllApps?userId=${user.userId}`
        );

        const data = await response.json();

        setApps(() => data.data);
        setLoading(false);
      } catch (error) {
        console.log(`An error occured while fetching: ${error}`);
      }
    }

    fetchAllApps();
  }, []);
  return (
    <div>
      <div>
        <button
          className="border p-1.5 hover:text-black bg-[#1a1a1a] hover:bg-slate-100"
          onClick={() => setShowDialog(true)}
        >
          Create New App
        </button>

        <div className="flex flex-col gap-0 p-8">
          <div className="flex justify-around border p-4 bg-[#1a1a1a]">
            <div className="w-1/3">Sr. No.</div>
            <div className="w-1/3">App Name</div>
            <div className="w-1/3">App Id</div>
          </div>

          <div className="flex justify-center ">
            {loading && <div className="">loading...</div>}
          </div>

          {apps &&
            apps.map((app, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-around border p-3 bg-[#1a1a1a] hover:bg-[#3d3d3d] hover:cursor-pointer"
                  onClick={() => navigate(`/application/${app.id}`)}
                >
                  <div className="w-1/3">{i + 1}</div>
                  <div className="w-1/3">{app.name}</div>
                  <div className="w-1/3">{app.id}</div>
                </div>
              );
            })}

          {showDialog && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={handleToggle}
            >
              <div
                className="bg-[#1a1a1a] p-6  shadow-lg w-1/3"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              >
                <h2 className="text-2xl font-semibold mb-4">Create New App</h2>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-300">
                      App Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full p-2 border border-gray-300 "
                      placeholder="Enter App Name"
                      onChange={(e) => setAppName(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-300">
                      App Context
                    </label>
                    <textarea
                      className="mt-1 h-[15vh] block w-full p-2 border border-gray-300 "
                      placeholder="Enter Context of your App"
                      onChange={(e) => setAppContext(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#1a1a1a] border  text-white py-2 px-4 hover:text-black hover:bg-slate-100"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
