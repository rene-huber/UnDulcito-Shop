import Feed from "@/components/Feed";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import Slider from "@/components/slider/Slider";
import Promo from "@/components/Promo";

export default function Home() {
  return (
    <main>
      <Promo />
      <Navbar />
    <Slider />
      <Feed />
    </main>
  );
}
