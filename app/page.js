import Feed from "@/components/feed/Feed";
import Image from "next/image";
import Navbar from "@/components/navbar/NavBar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Feed />
    </main>
  );
}
