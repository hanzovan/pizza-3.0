"use client";

import { SectionHeader } from "@/components/molecules";
import { UserForm, UserTabs } from "@/components/organisms";
import { UseProfile } from "@/components/UseProfile";
import { AuthUserType } from "@/types";
import { useSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: session, update } = useSession();
  if (!session) {
    return redirect("/login?callbackUrl=/users/" + id + "/edit");
  }
  const userRole = session.user.role || "";
  if (userRole !== "admin") {
    return redirect("/");
  }

  const [user, setUser] = useState<AuthUserType>({
    id: "",
    name: "",
    credentialAccount: false,
    email: "",
    avatar: "/avatar1.png",
    phone: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
    role: "",
    isBlocked: false,
    emailIsVerified: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then(res => res.json().then(user => {
        setUser(user);
    }))
  }, []);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const savingPromise = new Promise(async (resolve, reject) => {
        setTimeout(async() => {
            try {
                const response = await fetch("/api/profile", {
                    method: "PUT",
                    body: JSON.stringify(user),
                    headers: { "Content-Type": "application/json"}
                })
                if (response.ok) {
                    // if editing the current user, update the session
                    if (session.user.id === user.id) {
                        await update({
                            ...session,
                            user: {
                                ...session?.user,
                                name: user.name
                            }
                        })
                    }
                    resolve("Profile saved successfully");
                } else {
                    const errorData = await response.json();
                    reject(new Error(errorData.message || "Some error occurred"));
                }
            } catch (error) {
                reject(new Error(error instanceof Error ? error.message : "An unknown error occurred"))
            } finally {
                setIsLoading(false);
            }
        }, 500)
    })
    toast.promise(savingPromise, {
        loading: "Saving...",
        success: "Profile saved successfully",
        error: (err: Error) => err.message
    }).then(() => {
        router.push("/users")
    })
  };
  return (
    <section>
      <UserTabs userRole={userRole} />
      <SectionHeader mainHeader="Edit User" />
      <UserForm
        user={user}
        setUser={setUser}
        isLoading={isLoading}
        handleSubmit={handleUpdate}
      />
    </section>
  );
}
