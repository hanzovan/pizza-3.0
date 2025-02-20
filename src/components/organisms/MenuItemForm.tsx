"use client";

import { CategoryType, MenuItemFormProps } from "@/types";
import { MenuItemFormExtraField } from "./MenuItemFormExtraField";
import { useEffect, useState } from "react";
import { EditableImage } from "../molecules";

export function MenuItemForm({
  formIsSubmiting,
  handleSubmit,
  menuItem,
  setMenuItem,
}: MenuItemFormProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenuItem((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="md:flex item-start gap-4">
        <div>
          <EditableImage link={menuItem.image} setLink={(image: string) => setMenuItem(prev => ({...prev, image}))} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            name="name"
            type="text"
            value={menuItem.name}
            onChange={handleInputChange}
            disabled={formIsSubmiting}
          />
          <label>Category</label>
          <select
            required
            value={menuItem.category || ""}
            onChange={(ev) =>
              setMenuItem((prev) => ({ ...prev, category: ev.target.value }))
            }
          >
            <option value="" disabled>
              Choose category
            </option>
            {categories &&
              categories.map((c, index) => (
                <option key={index} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Description</label>
          <input
            name="description"
            type="text"
            value={menuItem.description}
            onChange={handleInputChange}
            disabled={formIsSubmiting}
          />
          <label>Base price</label>
          <input
            name="basePrice"
            type="number"
            value={menuItem.basePrice}
            onChange={handleInputChange}
            disabled={formIsSubmiting}
          />
          <MenuItemFormExtraField
            name="Sizes"
            addLabel="item size"
            fieldData={menuItem.sizes}
            updateFieldData={(newSizes) =>
              setMenuItem((prev) => ({ ...prev, sizes: newSizes }))
            }
            formIsSubmiting={formIsSubmiting}
          />
          <MenuItemFormExtraField
            name="Extra Ingredients"
            addLabel="extra ingredient"
            fieldData={menuItem.extraIngredients}
            updateFieldData={(newExtraIngredients) =>
              setMenuItem((prev) => ({
                ...prev,
                extraIngredients: newExtraIngredients,
              }))
            }
            formIsSubmiting={formIsSubmiting}
          />
          <button type="submit" disabled={formIsSubmiting}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
