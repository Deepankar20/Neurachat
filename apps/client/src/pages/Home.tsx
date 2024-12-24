import Navbar from "../components/Navbar";
import Neurachat from "neura-chatlibexample/src/Neurachat";

export default function Home() {
  return (
    <div>
      <Navbar />

      <p className="fixed bottom-[6vh] right-[10vh] text-xl font-semibold">Want to know more ? ask him : </p>
     
      <Neurachat
        apiKey="user_2qeHkOHYmBXcaxspaSdVWrQAI8B-q2weplnmp1"
        theme="slate"
      />

      <div className="flex flex-col justify-center items-center">
        <p className="text-[7vh] w-2/3 text-center font-semibold m-[2vh]">Make Custom Chat Support in your app!</p>

        <p>Create custom chat support for your app using our reliable AI service</p>
        <p>Sign In now and delve into the world of AI chat support...</p>
      </div>

    </div>
  );
}
