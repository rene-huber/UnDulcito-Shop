import Feed from "@/components/Feed";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import Slider from "@/components/slider/Slider";
import Adresse from "@/components/Adresse/Adresse";


export default function Home() {
  return (
    <main>
   
      <Navbar />
    <Slider />
      <Feed />
      <Adresse />
    </main>
  );
}
