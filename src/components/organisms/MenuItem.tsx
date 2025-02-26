"use client";

import { MenuItemOptionType, MenuItemType } from "@/types";
import { MenuItemTile } from "./MenuItemTile";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import Image from "next/image";

export function MenuItem(item: MenuItemType) {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within an AppProvider");
  }

  const defaultSize = item.sizes.length > 0 ? item.sizes[0] : undefined;

  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedSize, setSelectedSize] = useState<
    MenuItemOptionType | undefined
  >(defaultSize);
  const [selectedExtras, setSelectedExtras] = useState<MenuItemOptionType[]>(
    []
  );
  const { addToCart } = cartContext;

  const handleAddToCartButtonClick = () => {
    const hasOptions =
      item.sizes.length > 0 || item.extraIngredients.length > 0;
    if (hasOptions && !showPopUp) {
      setShowPopUp(true);
      setSelectedSize(defaultSize);
      setSelectedExtras([]);
      return;
    }
    addToCart(item, selectedSize, selectedExtras);
    setShowPopUp(false);
    toast.success("Added to cart");
  };

  const handleExtraIngredientClick = (ev: any, extraThing: any) => {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev: any) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev: any) => {
        return prev.filter((e: any) => e.name !== extraThing.name);
      });
    }
  };

  let selectedPrice = item.basePrice || 0;
  if (selectedSize) {
    selectedPrice += selectedSize.extraPrice;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.extraPrice;
    }
  }

  // Lock scrolling when pop up is shown
  useEffect(() => {
    if (showPopUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"
    }

    // clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    }
  }, [showPopUp])
  return (
    <>
      {showPopUp && (
        <div
          onClick={() => setShowPopUp(false)} // when user click outside the pop up, close it
          className="fixed inset-0 bg-black/60 z-[1000] flex justify-center items-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()} // when user click inside pop up, don't close the pop up
            className="bg-white p-4 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={item.image || "/dishes.jpg"}
                alt={item.name || ""}
                width={300}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">
                {item.name}
              </h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {item.description}
              </p>
              {item.sizes?.length > 0 && (
                <div>
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {item.sizes.map((size, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        name="size"
                        onClick={() =>
                          setSelectedSize({
                            name: size.name,
                            extraPrice: size.extraPrice,
                          })
                        }
                        defaultChecked={index === 0}
                      />
                      {size.name} ${(item.basePrice || 0) + size.extraPrice}
                    </label>
                  ))}
                </div>
              )}
              {item.extraIngredients?.length > 0 && (
                <div>
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {item.extraIngredients.map((i, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1"
                    >
                      <input
                        type="checkbox"
                        name="extraIngredients"
                        onClick={(ev) => handleExtraIngredientClick(ev, i)}
                      />
                      {i.name} ${i.extraPrice}
                    </label>
                  ))}
                </div>
              )}
              <button
                type="button"
                className="bg-primary text-white sticky bottom-2"
                onClick={handleAddToCartButtonClick}
              >
                Add to cart ${selectedPrice}
              </button>
              <button
                type="button"
                className="mt-2 border"
                onClick={() => setShowPopUp(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile item={item} onAddToCart={handleAddToCartButtonClick} />
    </>
  );
}
