"use client";

import { allTabs } from "@/lib/routes/tabsConfigs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function UserTabs({ userRole }: { userRole: string }) {
  const path = usePathname();
  const tabUrls =
    userRole === "admin"
      ? allTabs.adminTabs
      : userRole === "user"
      ? allTabs.userTabs
      : [];

  return (
    <div className="flex gap-2 justify-center flex-wrap pt-4 tabs">
      {tabUrls.map((item, index) => (
        <Link
          key={index}
          href={item.url}
          className={path.startsWith(item.url) ? "active" : ""}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
