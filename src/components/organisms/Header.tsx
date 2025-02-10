"use client";

import Link from "next/link";
import { Cart, HamburgerButton } from "../atoms";
import { useState } from "react";
import {
  mobileItems,
  navigatingItems,
  settingItems,
} from "@/lib/routes/navigatingConfigs";
import { useSession } from "next-auth/react";

export function Header() {
  const session = useSession();

  const mobileNavItems =
    session.status === "authenticated"
      ? mobileItems.userMobileItems
      : mobileItems.publicMobileItems;

  const navItems =
    session.status === "authenticated"
      ? navigatingItems.userNavigatingItems
      : navigatingItems.publicNavigatingItems;

  const setItems =
    session.status === "authenticated"
      ? settingItems.userSettingItems
      : settingItems.publicSettingItems;

  const [openMobileNav, setOpenMobileNav] = useState(false);

  const userData = session?.data?.user;

  let userName = userData?.name || userData?.email;

  if (userName?.includes(' ')) {
    userName = userName?.split(' ')[0];
  }

  return (
    <header>
      {/* mobile header */}
      <div className="md:hidden flex justify-between p-4 items-center">
        <Link href="/" className="text-3xl font-bold text-primary">
          Arda Pizza
        </Link>
        <div className="flex items-center gap-6">
          <Link href={"/cart"} className="relative">
            <Cart className="w-10 h-10" />
          </Link>
          <button onClick={() => setOpenMobileNav((prev) => !prev)}>
            <HamburgerButton strokeWidth={2} className="w-10 h-10" />
          </button>
        </div>
      </div>

      {/* mobile navigating tabs */}
      {openMobileNav && (
        <div
          className="md:hidden fixed bg-black/60 inset-0"
          onClick={() => setOpenMobileNav(false)}
        >
          <div
            className={`bg-gray-300 mx-4 rounded-lg flex flex-col gap-4 text-center mt-2 py-4 text-xl font-bold mt-[100px]`}
          >
            {mobileNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className={`py-3 ${
                  index > 0 ? "border-t border-gray-400/50" : ""
                }`}
              >
                {item.label === "Login" ? (
                    // use inline block to prevent the div to take full width
                    <div className="bg-primary text-white px-8 py-2 rounded-lg inline-block">
                        {item.label}
                    </div>
                ) : item.label === "Profile" ? (
                  <span className="whitespace-nowrap">Hello, {userName}</span>
                ) : (
                  item.label
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* larger screen header */}
      <div className="hidden md:flex justify-between items-center font-bold text-gray-500 p-4">
        {/* header's left part */}
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-2xl text-primary">
            Arda Pizza
          </Link>
          {navItems.map((item, index) => (
            <Link href={item.url} key={index}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* header's right part */}
        <div className="flex gap-4 items-center">
          {setItems.map((item, index) =>
            item.label === "Login" ? (
              <Link key={index} href={item.url}>
                <button className="bg-primary text-white px-8 py-2 rounded-lg">
                  {item.label}
                </button>
              </Link>
            ) : item.label === "Profile" ? (
              <Link key={index} href={item.url} className="whitespace-nowrap">
                Hi, {userName}
              </Link>
            ) : (
              <Link key={index} href={item.url}>
                {item.label}
              </Link>
            )
          )}
          <Link href={"/cart"}>
            <Cart className="w-8 h-8" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
