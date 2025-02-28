"use client";

import { SectionHeader } from "@/components/molecules";
import { UserTabs } from "@/components/organisms";
import { dbTimeForHuman } from "@/lib/utils";
import { OrderType } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const {data: session} = useSession();
    if (!session) {
        return redirect("/login?callbackUrl=/orders")
    }
    const userRole = session.user.role || "";

    const [loadingOrders, setLoadingOrders] = useState(true);
    const [orders, setOrders] = useState<OrderType[]>();

    const fetchOrders = () => {
        setLoadingOrders(true);
        fetch("/api/orders").then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
                setLoadingOrders(false)
            })
        })
    }

    useEffect(() => {
        fetchOrders();
    }, [])
    
    return (
        <section>
            <UserTabs userRole={userRole} />
            <SectionHeader mainHeader="Orders" />
            {loadingOrders && (
                <div className="pt-4 text-center">Loading orders...</div>
            )}
            {(!orders || orders.length === 0) && (
                <div className="p-4 text-center">
                    No order
                </div>
            )}
            {orders && orders.length > 0 && orders?.map((order, index) => (
                <div key={index} className="bg-gray-200 p-4 rounded-lg mb-2 flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto">
                    <div className="grow flex flex-col sm:flex-row items-center gap-4">
                        <div className={(order.paid ? "bg-green-500" : "bg-red-500") + " " + "p-2 rounded-lg text-white w-24 text-center text-sm font-bold"}>
                            {order.paid ? "Paid" : "Not paid"}
                        </div>
                        <div className="grow">
                            <div className="flex flex-col sm:flex-row gap-2 items-center mb-1">
                                <div className="grow">{order.userEmail}</div>
                                <div className="text-sm text-gray-500">
                                    {dbTimeForHuman(order.createdAt)}
                                </div>
                            </div>
                            <div className="text-gray-500 text-xs text-center">
                                {order.cartProducts.map(p => p.name).join(", ")}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link href={"/orders/" + order._id} className="border border-gray-400 button text-center text-sm">
                            Show order
                        </Link>
                    </div>
                </div>
            ))}
        </section>
    )
}