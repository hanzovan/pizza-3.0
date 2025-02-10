import Image from "next/image";
import { SectionHeader } from "../molecules";
import { MenuItem } from "./MenuItem";

export function HomeMenu() {
  return (
    <section>
      <div className="absolute left-0 right-0">
        <Image
          src="/pepper.png"
          alt="pepper"
          width={200}
          height={200}
          className="absolute -left-[150px] -top-[120px] -z-10 w-auto h-auto"
        />
        <Image
          src="/pizza2.png"
          alt="pizza2"
          width={200}
          height={200}
          className="hidden md:block absolute -right-[150px] -top-[90px] -z-10 w-auto h-auto"
        />
      </div>
      <SectionHeader subHeader="checkout" mainHeader="Menu" />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}
