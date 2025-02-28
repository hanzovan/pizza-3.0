import { CartProductType } from "@/types"
import { cartProductPrice } from "../AppContext"
import Image from "next/image"

type CartProductProps = {
    product: CartProductType
}

export function CartProduct({product}: CartProductProps) {
    return (
        <div
      className="flex items-center gap-4 mb-4 border-b pb-4 py-2"
    >
      <div className="w-24">
        <Image
          src={product.image || "/dishes.jpg"}
          alt={product.name || ""}
          width={240}
          height={240}
        />
      </div>
      <div className="grow">
        <h3 className="font-bold">{product.name}</h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extra && (
          <div>
            {product.extra.map((extra, index) => (
              <div key={index} className="text-sm text-gray-600">
                {extra.name} ${extra.extraPrice}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-bold">${cartProductPrice(product)}</div>
    </div>
    )
}