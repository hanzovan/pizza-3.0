"use client";

import { AddToCartButtonProps } from "@/types";

export function AddToCartButton({ handleClick, hasSizesOrExtras, item}: AddToCartButtonProps) {
    return (
        <button type="button" onClick={handleClick} className="mt-6 bg-primary text-white rounded-full px-8 py-2 text-sm font-bold">
            <span>{hasSizesOrExtras ? "From $" : "Add to cart $"}{item.basePrice}</span>
        </button>
    )
}