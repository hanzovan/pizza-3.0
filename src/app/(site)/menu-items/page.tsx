"use client";

import { ChevronRight } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import { UserTabs } from "@/components/organisms";
import { MenuItemType } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenuItemPage() {
  const { data: session } = useSession();

  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    fetch("/api/menu-items").then((response) =>
      response.json().then((fetchedMenuItems) => setMenuItems(fetchedMenuItems))
    );
  };

  if (!session) {
    return redirect("/login?callbackUrl=/menu-items");
  }

  const userRole = session.user.role || "";

  return (
    <section>
      <UserTabs userRole={userRole} />
      <SectionHeader mainHeader="Menu Items" />
      <div className="max-w-xl mx-auto">
        <Link
          href={"/menu-items/new"}
          className="button bg-gray-300 text-center"
        >
          <span className="flex gap-2 items-center justify-center">
            Create new menu item
            <ChevronRight strokeWidth={2} />
          </span>
        </Link>
      </div>
      {menuItems && (
        <div className="md:max-w-3xl sm:max-w-lg max-w-sm mx-auto">
          <h2 className="text-center text-sm py-4">All available menu items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 md:gap-10 gap-12 place-items-center">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={"/menu-items/" + item._id + "/edit"}
                className="px-12 text-center bg-gray-300 p-4 rounded-lg flex flex-col my-2 justify-between items-center duration-300 hover:scale-105 hover:bg-gray-100"
              >
                <div>
                  <Image
                    src={item.image || ""}
                    alt={item.name || ""}
                    width={100}
                    height={100}
                    className="w-48 h-48 sm:w-36 sm:h-36 md:w-28 md:h-28"
                  />
                </div>
                <div className="font-bold text-gray-600">{item.name}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
