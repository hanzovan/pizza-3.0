"use client";

import Image from "next/image";
import { SectionHeader } from "../molecules";
import { MenuItem } from "./MenuItem";
import { useEffect, useState } from "react";
import { MenuItemType } from "@/types";

export function HomeMenu() {
  const [newestPizzas, setNewestPizzas] = useState<MenuItemType[]>([]);

  useEffect(() => {
    fetch("/api/menu-items").then(res => res.json().then(menuItems => {
      setNewestPizzas(menuItems.reverse().slice(0, 3));
    }))
  }, [])
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
        {newestPizzas.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
