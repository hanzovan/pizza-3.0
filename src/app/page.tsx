import { Hero, HomeMenu, ImageCarousel, InfoSection } from "@/components/organisms";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <ImageCarousel />
      <InfoSection />
    </>
  );
}
