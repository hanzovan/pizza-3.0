"use client";

import { CartContext, cartProductPrice } from "@/components/AppContext";
import { Trash } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import { UserAddress } from "@/components/organisms";
import { UseProfile } from "@/components/UseProfile";
import { AuthUserType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
    const router = useRouter();
    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error("CartContext must be used within an AppProvider");
    }

    const { cartProducts, removeCartProduct } = cartContext;

    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }

    const { data: profileData } = UseProfile();
    const [user, setUser] = useState<AuthUserType>({
    id: "",
    name: "",
    credentialAccount: false,
    email: "",
    avatar: "/avatar1.png",
    phone: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
    role: "",
    isBlocked: false,
    emailIsVerified: false,
    });

    useEffect(() => {
        if (profileData) {
            setUser(profileData)
        }
    }, [profileData])

    const proceedToCheckout = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        toast.promise(
            fetch("/api/checkout", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user,
                    cartProducts
                })
            }).then(async res => {
                if (res.ok) {
                    const link = await res.json()
                    router.push(link);
                } else {
                    throw new Error("Failed to checkout")
                }
            }),
            {
                loading: "Checking out...",
                success: "Going to payment site...",
                error: (err: Error) => err.message || "Some error occurred"
            }
        )
    }
    useEffect(() => {
        if (window.location.href.includes('canceled=1')) {
            toast.error('Payment canceled!')
        }
    }, [])

    if (cartProducts?.length === 0) {
        return (
            <section>
                <SectionHeader mainHeader="Cart" />
                <p>Your shopping cart is empty</p>
            </section>
        )
    }
    
    return (
        <section>
            <SectionHeader mainHeader="Cart" />
            <div className="sm:grid grid-cols-2 gap-4">
                <div>
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4 border-b pb-4 py-2">
                            <div className="w-24">
                                <Image src={product.image || "/dishes.jpg"} alt={product.name || "pizza"} width={240} height={240} />
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
                            <div className="text-lg font-bold">
                                ${cartProductPrice(product)}
                            </div>
                            <div className="ml-2">
                                <button type="button" onClick={() => removeCartProduct(index)} className="border border-gray-500">
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="py-4 pr-14 flex gap-4 justify-end items-center leading-loose">
                        <div className="text-gray-600">
                            Subtotal:<br />
                            Delivery:<br />
                            Total:
                        </div>
                        <div className="font-bold pl-2 text-right">
                            ${subtotal}<br />
                            $5<br />
                            ${subtotal + 5}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 p-4 rounded-lg">
                    <h2 className="font-bold">Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <UserAddress user={user} setUser={setUser} isLoading={true} />
                        <button type="submit">Pay ${subtotal + 5}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}