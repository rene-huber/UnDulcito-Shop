import Feed from "@/components/Feed";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import Slider from "@/components/slider/Slider";


export default function Home() {
  return (
    <main>
   
      <Navbar />
    <Slider />
      <Feed />
    </main>
  );
}
