"use client";

import { SectionHeader } from "@/components/molecules";
import { UserTabs } from "@/components/organisms";
import { AuthUserType } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const { data: session } = useSession();
    if (!session) {
        return redirect("/login?callbackUrl=/users")
    }
    const userRole = session.user.role || "";

    if (userRole !== 'admin') {
        return redirect("/")
    }
    
    const [users, setUsers] = useState<AuthUserType[]>([])

    useEffect(() => {
        fetch("/api/users").then(res => {
            res.json().then(users => {
                setUsers(users);
            })
        })
    }, [])
    return (
        <section>
            <UserTabs userRole={userRole} />
            <SectionHeader mainHeader="Users" />
            <div className="max-w-md mx-auto">
                {users && users.map((user, index) => (
                    <div key={index} className="bg-gray-200 rounded-xl px-4 flex items-center gap-8 my-2">
                        <div className="grow">
                            <div className="grid grid-cols-2">
                                <span className={user.name ? "" : "text-primary italic"}>{user.name || "Name not provided"}</span>
                                <span className="text-gray-500">({user.email})</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href={"/users/" + user.id + "/edit"}>
                                <button type="button">Edit</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}