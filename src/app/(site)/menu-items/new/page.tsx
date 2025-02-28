"use client";

import { ChevronLeft } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import { MenuItemForm, UserTabs } from "@/components/organisms";
import { MenuItemType } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateMenuItemPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [menuItem, setMenuItem] = useState<MenuItemType>({
    name: "",
    category: "",
    description: "",
    basePrice: 0,
    image: "",
    sizes: [],
    extraIngredients: [],
  });

  const [formIsSubmiting, setFormIsSubmiting] = useState(false);
  if (!session) {
    return redirect("/login?callbackUrl=/menu-items/new");
  }
  const userRole = session.user.role || "";

  if (userRole !== "admin") {
    return redirect("/");
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormIsSubmiting(true);
    const savingPromise = new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await fetch("/api/menu-items", {
            method: "POST",
            body: JSON.stringify(menuItem),
            headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
            resolve("Success");
          } else {
            const errorData = await response.json();
            reject(new Error(errorData.message || "Failed to save"));
          }
        } catch (error) {
          console.log(error);
          reject(
            new Error(
              error instanceof Error
                ? error.message
                : "An unknown error occurred"
            )
          );
        } finally {
          setFormIsSubmiting(false);
        }
      }, 1000);
    });
    toast
      .promise(savingPromise, {
        loading: "Saving this tasty item...",
        success: "Saved",
        error: (err: Error) => err.message || "Some error occurred, can't save",
      })
      .then(() => {
        router.push("/menu-items");
      });
  };

  return (
    <section>
      <UserTabs userRole={userRole} />
      <SectionHeader mainHeader="Create New Item" />
      <div className="max-w-xl mx-auto">
        <Link href={"/menu-items"} className="button bg-gray-300 text-center">
          <span className="flex gap-2 justify-center items-center">
            <ChevronLeft strokeWidth={2} />
            Show all menu items
          </span>
        </Link>
        <MenuItemForm
          formIsSubmiting={formIsSubmiting}
          handleSubmit={handleFormSubmit}
          menuItem={menuItem}
          setMenuItem={setMenuItem}
        />
      </div>
    </section>
  );
}
