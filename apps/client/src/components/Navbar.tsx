import {
  SignInButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-[100vw] bg-[#1a1a1a]">
      <div className="  w-screen h-[10vh] flex items-center justify-between p-8 shadow-md">
        <button
          className="flex items-center text-[2rem] font-semibold"
          onClick={() => navigate("/")}
        >
          NeuraChat
        </button>

        <div className="flex items-center gap-[2vw]">
          <button
            onClick={() => navigate("/dashboard")}
            className="border p-[0.65rem] hover:bg-slate-100 hover:text-black"
          >
            Dashboard
          </button>

          <div className=" ">
            <SignedOut>
              <div className="border p-[0.65rem] hover:bg-slate-100 hover:text-black hover:cursor-pointer">
                <SignInButton />
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
