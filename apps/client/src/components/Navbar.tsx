import {
  SignInButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="w-[100vw] bg-[#1a1a1a]">
      <div className="  w-screen h-[10vh] flex items-center justify-between p-8 shadow-md">
        <button className="flex items-center text-[2rem] font-semibold">
          NeuraChat
        </button>

        <div className=" ">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
