"use client";

import { ButtonNeedConfirm } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import { UserTabs } from "@/components/organisms";
import { CategoryType } from "@/types";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
    const { data: session } = useSession();
    if (!session) {
        return redirect("/login?callbackUrl=/categories")
    }
    const userRole = session.user.role || "";

    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [editCategory, setEditCategory] = useState<CategoryType | null>();

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const creatingPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName } as CategoryType;
            if (editCategory) {
                data._id = editCategory._id;
            }
            const response = await fetch("/api/categories", {
                method: editCategory ? "PUT" : "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            })

            setCategoryName("");

            if (response.ok) {
                resolve("Success");
                fetchCategories();
            } else {
                const errorData = await response.json();
                reject(new Error(errorData.message || "An unknown error occurred"))
            }
        });
        await toast.promise(creatingPromise, {
            loading: editCategory ? "Updating category..." : "Creating new category...",
            success: editCategory ? "Updating category successfully" : "New category was added successfully",
            error: (err: Error) => err.message
        })
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = () => {
        fetch("/api/categories").then(response => response.json().then(fetchedCategories => {
            setCategories(fetchedCategories)
        }))
    }

    async function handleDelete(id: string | undefined) {
        await toast.promise(
            fetch("/api/categories", {
                method: "DELETE",
                body: JSON.stringify(id),
                headers: {"Content-Type": "application/json"}
            }).then(res => {
                if (!res.ok) {
                    const errorData = res.json();
                    console.log(errorData);
                    throw new Error("Failed to delete")
                }
                fetchCategories();
            }),
            {
                loading: "Deleting the category...",
                success: "Category was removed",
                error: (err: Error) => err.message || "Some unknown error occurred"
            }
        )
    }
    return (
        <section>
            <UserTabs userRole={userRole} />
            <SectionHeader mainHeader="Categories" />
            <div className="max-w-xl mx-auto">
                <form onSubmit={handleFormSubmit}>
                    <div className="flex items-end gap-4">
                        <div className="grow">
                            <label>
                                {editCategory ? "Update category" : "Create new category"}                                
                            </label>
                            <input required name="category_name" type="text" value={categoryName} onChange={(ev) => setCategoryName(ev.target.value)} />
                        </div>
                        <div className="flex items-center gap-4">
                            <button type="submit" className="px-8 py-2">
                                {editCategory ? "Update" : "Create"}
                            </button>
                            {editCategory && (
                                <button className="bg-gray-200 border border-gray-300 px-8" type="button" onClick={() => {setEditCategory(null); setCategoryName("")}}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </form>
                {categories && (
                    <div>
                        <h2>Existing categories</h2>
                        {categories.map((c, index) => (
                            <div key={index} className="flex items-center bg-gray-200 gap-1 my-2 rounded-xl px-4 py-2">
                                <div className="grow">
                                    {c.name}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button type="button" className="border border-gray-400 bg-gray-300" onClick={() => {setEditCategory(c); setCategoryName(c.name)}}>
                                        Edit
                                    </button>
                                    <ButtonNeedConfirm label={'Delete'} className="bg-gray-300 border border-gray-400" onProceed={() => handleDelete(c._id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}