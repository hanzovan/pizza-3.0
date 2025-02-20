"use client";

import { useState } from "react";
import { ChevronDown } from "../atoms/ChevronDown";
import { ChevronUp, Plus, Trash } from "../atoms";
import { MenuItemFormExtraFieldProps } from "@/types";

export function MenuItemFormExtraField({
  name,
  addLabel,
  fieldData,
  updateFieldData,
  formIsSubmiting,
}: MenuItemFormExtraFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFieldChange = (
    index: number,
    field: "name" | "extraPrice",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue =
      field === "extraPrice" ? parseFloat(e.target.value) || 0 : e.target.value;
    const updatedData = [...fieldData];

    if (field === "name") {
      updatedData[index].name = newValue as string;
    } else {
      updatedData[index].extraPrice = newValue as number;
    }

    updateFieldData(updatedData);
  };

  const removeField = (index: number) => {
    updateFieldData(fieldData.filter((_, i) => i !== index));
  };

  const addField = () => {
    updateFieldData([...fieldData, { name: "", extraPrice: 0 }]);
  };

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex gap-1 items-center justify-start p-1"
      >
        {!isOpen && <ChevronDown />}
        {isOpen && <ChevronUp />}
        <span>{name}</span>
        <span>({fieldData?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {fieldData?.map((field, index) => (
          <div key={index}>
            <div className="flex gap-2 items-end">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={field.name}
                  onChange={(e) => handleFieldChange(index, "name", e)}
                  disabled={formIsSubmiting}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type="number"
                  placeholder="Extra price"
                  value={
                    field.extraPrice === 0 ? "" : field.extraPrice.toString()
                  }
                  onChange={(e) => handleFieldChange(index, "extraPrice", e)}
                  disabled={formIsSubmiting}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  disabled={formIsSubmiting}
                  className="text-gray-500"
                >
                  <Trash strokeWidth={1.5} className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addField}
          className="bg-white flex justify-center items-center gap-2"
          disabled={formIsSubmiting}
        >
          <Plus />
          <span>Add {addLabel}</span>
        </button>
      </div>
    </div>
  );
}
