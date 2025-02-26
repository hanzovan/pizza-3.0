"use client";

import { SectionHeader } from "@/components/molecules";
import { UserTabs } from "@/components/organisms";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function OrdersPage() {
    const {data: session} = useSession();
    if (!session) {
        return redirect("/login?callbackUrl=/all-orders")
    }
    const userRole = session.user.role || "";
    if (userRole !== 'admin') {
        return redirect("/")
    }
    return (
        <section>
            <UserTabs userRole={userRole} />
            <SectionHeader mainHeader="Orders" />
        </section>
    )
}