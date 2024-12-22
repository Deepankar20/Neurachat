import Navbar from "../components/Navbar";
import Chatbox from "@repo/ui/chatbox";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Chatbox apiKey="hii" />
    </div>
  );
}
