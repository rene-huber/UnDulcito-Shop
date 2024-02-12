import Feed from "@/components/Feed";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import Search from "@/components/Search";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Feed />
      <Search />
    </main>
  );
}
