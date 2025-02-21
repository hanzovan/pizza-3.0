"use client";

import { SectionHeader } from "@/components/molecules";
import { MenuItem } from "@/components/organisms";
import { CategoryType, MenuItemType } from "@/types";
import { useEffect, useState } from "react";

export default function MenuPage() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

    useEffect(() => {
        fetch("/api/categories").then(res => {
            res.json().then(allCategories => {
                setCategories(allCategories);
            })
        })
        fetch("/api/menu-items").then(res => {
            res.json().then(allMenuItems => {
                setMenuItems(allMenuItems);
            })
        })
    }, [])
    return (
        <section>
            <SectionHeader mainHeader="Menu" />
            {categories && categories.map(c => (
                <div key={c._id}>
                    <div>
                        <SectionHeader mainHeader={c.name} />
                    </div>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                        {menuItems.filter(m => m.category === c._id).map(item => (
                            <MenuItem key={item._id} {...item} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}