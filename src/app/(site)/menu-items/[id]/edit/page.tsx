"use client";

import { ButtonNeedConfirm, ChevronLeft } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import { MenuItemForm, UserTabs } from "@/components/organisms";
import { MenuItemType } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {
    // get id and session, if not redirect user to login route
  const router = useRouter();
  const { id } = useParams();
  const { data: session } = useSession();
  if (!session) {
    return redirect("/login?callbackUrl=/menu-items/" + id + "/edit");
  }
  const userRole = session.user.role || "";

  if (userRole !== 'admin') {
    return redirect("/")
}

  // create a default value for menuItem, then use useEffect to fetch the info
  const [menuItem, setMenuItem] = useState<MenuItemType>({
    name: "",
    category: "",
    description: "",
    basePrice: 0,
    image: "",
    sizes: [],
    extraIngredients: [],
  });

  useEffect(() => {
    fetch("/api/menu-items").then((response) =>
      response.json().then((fetchedMenuItems) => {
        const item = fetchedMenuItems.find((i: MenuItemType) => i._id === id);
        setMenuItem(item);
      })
    );
  }, []);

  // state use for disable button
  const [formIsSubmiting, setFormIsSubmiting] = useState(false)

  // handle when form was submitted
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormIsSubmiting(true);

    // use toast to inform user if form submitting success or fail, update the info of menuItem
    toast.promise(fetch('/api/menu-items', {
        method: 'PUT',
        body: JSON.stringify({...menuItem, id }),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => {
        if (res.ok) {
            router.push('/menu-items');
        } else {
            throw new Error('Failed to save!');
        }
    }), {
        loading: 'Updating the item...',
        success: 'Saved',
        error: (err: Error) => err.message || "Some unknown error occurred"
    })
  }

  const handleDelete = () => {
    toast.promise(fetch("/api/menu-items", {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: { 'Content-Type': 'application/json'}
    }).then(res => {
        if (res.ok) {
            router.push("/menu-items");
        } else {
            throw new Error("Failed to delete");
        }
    }), {
        loading: "Delete the item...",
        success: "Deleted",
        error: (err: Error) => err.message || "Some error occurred"
    })
  }

  return (
    <section>
      <UserTabs userRole={userRole} />
      <SectionHeader mainHeader="Edit Item" />
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
        <div className="border-t my-4 border-gray-300"></div>
        <ButtonNeedConfirm label="Delete this menu item" className="bg-gray-200 border border-gray-300 mx-auto" onProceed={handleDelete} />
      </div>
    </section>
  );
}
