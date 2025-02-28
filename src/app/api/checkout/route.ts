import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/authOptions";
import { MenuItemOptionType } from "@/types";
import { MenuItemService, OrderService } from "@/lib/services";

const stripe = require("stripe")(process.env.STRIPE_SK ?? "STRIPE_SK not found")

export async function POST(req: NextRequest) {
    const {cartProducts, user} = await req.json();

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    // OrderDoc suppose not to get sizes and extraIngredients, just the size and extra that user picked
    // Because the cartProducts in OrderModel only have size and extra, doesn't have sizes, and extraIngredients

    if (!userEmail) {
        return Response.json({message: 'You need to log in!'}, {status: 400})
    }

    const newOrder = await OrderService.createOrder({
        userEmail,
        phone: user.phone,
        streetAddress: user.streetAddress,
        postalCode: user.postalCode,
        city: user.city,
        country: user.country,
        cartProducts,
        paid: false,
    })

    const orderDoc = newOrder.data

    const stripeLineItems = <any>[]

    // push every product to stripe
    for (const cartProduct of cartProducts) {
        const productName = cartProduct.name;

        const findProductInfo = await MenuItemService.findOneMenuItem(cartProduct._id)
        const productInfo = findProductInfo.data;

        let productPrice = productInfo.basePrice;

        if (cartProduct.size) {
            const size = productInfo.sizes.find((size: MenuItemOptionType) => size.name === cartProduct.size.name)
            productPrice += size.extraPrice
        }
        if (cartProduct.extra?.length > 0) {
            for (const extraItem of cartProduct.extra) {
                const extraItemInfo = productInfo.extraIngredients.find((extra: MenuItemOptionType) => extra.name === extraItem.name);
                productPrice += extraItemInfo.extraPrice
            }
        }

        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: "USD",
                product_data: {
                    name: productName
                },
                unit_amount: productPrice * 100
            }
        })
    }

    // sessions with 's' instead of 'session'
    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: "payment",
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + "/orders/" + orderDoc._id.toString() + "?clear-cart=1",
        cancel_url: process.env.NEXTAUTH_URL + "/cart?canceled=1",
        metadata: {orderId:orderDoc._id.toString()},
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery fee",
                    type: "fixed_amount",
                    fixed_amount: {amount: 500, currency: "USD"}
                }
            }
        ]
    })
    
    return Response.json(stripeSession.url);

}