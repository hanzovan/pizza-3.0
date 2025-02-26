import { OrderService } from "@/lib/services";
import { NextRequest } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SK ?? 'STRIPE_SK not found')

export async function POST(req: NextRequest) {
    const signature = req.headers.get('stripe-signature');
    let event;

    try {
        const reqBuffer = await req.text();

        const signSecret = process.env.STRIPE_Webhook_Signing_Secret ?? "Stripe signing secret not found"

        event = stripe.webhooks.constructEvent(reqBuffer, signature, signSecret)
    } catch (error) {
        console.error('stripe error');
        console.log(error);
        return Response.json(error, {status: 400})
    }

    if (event.type === 'checkout.session.completed') {
        const orderId = event?.data?.object?.metadata?.orderId
        const isPaid = event?.data?.object?.payment_status === 'paid'

        if (isPaid) {
            await OrderService.updateOrder(orderId, {paid: true})

            return Response.json('Order paid! Congratulation', {status: 200})
        }
    }
    return Response.json('ok', {status: 200});
}