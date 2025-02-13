"use client";

import { SectionHeader } from "@/components/molecules";
import { UserTabs } from "@/components/organisms";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

export default function MenuItemPage() {
    const { data: session } = useSession();
    if (!session) {
        return redirect("/login?callbackUrl=/menu-items");
    }
    const userRole = session.user.role || "";
    return (
        <section>
            <UserTabs userRole={userRole} />
            <SectionHeader mainHeader="Menu Items" />
        </section>
    )
}