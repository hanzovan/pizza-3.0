"use client";

import { SectionHeader } from "@/components/molecules";
import { UserForm, UserTabs } from "@/components/organisms";
import { UseProfile } from "@/components/UseProfile";
import { AuthUserType } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { data: session, update} = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const { loading: profileLoading, data: profileData } = UseProfile();
  const isAdmin = profileData?.role || "";
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    const savingPromise = new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await fetch("/api/profile", {
            method: "PUT",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            // update session user name
            await update({
                ...session,
                user: {
                    ...session?.user,
                    name: user.name
                }
            })
            resolve("Profile saved successfully");
          } else {
            const errorData = await response.json();
            reject(new Error(errorData.message || "Some error occurred"));
          }
        } catch (error) {
          reject(
            new Error(
              error instanceof Error
                ? error.message
                : "An unknown error occurred"
            )
          );
        } finally {
          setIsLoading(false);
        }
      }, 500);
    });
    toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved successfully",
      error: (err: Error) => err.message,
    });
  };

  useEffect(() => {
    if (profileData) {
      setUser(profileData);
    }
  }, [profileData]);

  if (profileLoading) {
    return "Loading user info...";
  }

  return (
    <section>
      <UserTabs isAdmin={isAdmin} />
      <SectionHeader mainHeader="Profile" />
      <UserForm
        handleSubmit={handleSubmit}
        user={user}
        setUser={setUser}
        isLoading={isLoading}
      />
    </section>
  );
}
