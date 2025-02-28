"use client";

import { CartContext, cartProductPrice } from "@/components/AppContext";
import { ChevronLeft } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import { CartProduct, UserAddress } from "@/components/organisms";
import { UseProfile } from "@/components/UseProfile";
import { AuthUserType, CartProductType, OrderType } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
  const cartContext = useContext(CartContext);
  const [order, setOrder] = useState<OrderType>();

  const { id } = useParams();

  const [loadingOrder, setLoadingOrder] = useState(true);

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
      setUser(profileData);
    }
  }, [profileData]);
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }
  }, []);
  
  if (!cartContext) {
    throw new Error("CartContext must be used within an AppProvider");
  }
  const { clearCart } = cartContext;

  let subtotal = 0;

  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }
  return (
    <section>
      <SectionHeader mainHeader="Your order" />
      <div>
        <p>Thanks for your order</p>
        <p>We will call when your order is ready</p>
      </div>

      {loadingOrder && <div className="p-4 text-center">Loading order...</div>}
      {order && (
        <div className="grid sm:grid-cols-2 sm:gap-16 mx-4 mt-8 mb-8">
          <div>
            {order.cartProducts.map((product: CartProductType, index) => (
              <CartProduct key={index} product={product} />
            ))}
            <div className="flex justify-end py-4 text-lg">
              <div className="text-gray-600">
                Subtotal:
                <br />
                Delivery:
                <br />
                Total:
              </div>
              <div className="font-bold text-right pl-2">
                {subtotal}
                <br />
                $5
                <br />${subtotal + 5}
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <UserAddress user={user} setUser={setUser} isLoading={true} />
          </div>
        </div>
      )}
      <Link
        href={"/orders"}
        className="button bg-gray-300 text-center max-w-2xl mx-auto"
      >
        <span className="flex gap-2 justify-center items-center">
          <ChevronLeft strokeWidth={2} />
          Show all orders
        </span>
      </Link>
    </section>
  );
}
