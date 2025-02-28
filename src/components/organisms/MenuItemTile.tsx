import { MenuItemTileProps } from "@/types";
import { AddToCartButton } from "../atoms/AddToCartButton";
import Image from "next/image";

export function MenuItemTile({ item, onAddToCart }: MenuItemTileProps) {
  const hasSizesOrExtras = item.sizes.length > 0 || item.extraIngredients.length > 0
  return (
    <div className="bg-gray-300 pt-8 pb-4 px-6 rounded-lg text-center hover:bg-gray-100 hover:shadow hover:shadow/50 duration-300 hover:scale-105 flex flex-col justify-between">
      <Image
        src={item.image || "/dishes.png"}
        alt={item.name || "pizza"}
        className="max-h-32 mx-auto"
      />
      <h2 className="text-2xl font-semibold text-gray-600 pt-4 pb-2">
        {item.name}
      </h2>

      {/* line-clam-3 will reduce extra text to only ... */}
      <p className="text-gray-500 grow line-clamp-3">{item.description}</p>
      <AddToCartButton handleClick={onAddToCart} hasSizesOrExtras={hasSizesOrExtras} item={item} />
    </div>
  );
}
