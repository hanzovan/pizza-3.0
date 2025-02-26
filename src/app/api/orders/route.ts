import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/authOptions";
import { roleCheck } from "@/lib/utils/roleCheck";
import { OrderService } from "@/lib/services";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    const userEmail = session?.user?.email;
    const role = await roleCheck();
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id')

    // If user is admin, allow them to access all orders, else only let them access only their orders
    if (role === 'admin') {
        if (_id) {
            return Response.json((await OrderService.findOneOrder(_id)).data);
        }
        return Response.json((await OrderService.findAllOrders()).data)
    } else if (userEmail) {
        if (_id) {
            const findUserOrder = await OrderService.findOneOrder(_id);
            const foundedOrder = findUserOrder.data;

            // If order is not theirs, return null
            if (foundedOrder.email !== userEmail) {
                return Response.json({})
            } else {
                return Response.json((await OrderService.findOneOrder(_id)).data);
            }
        }
        return Response.json((await OrderService.findAllOrdersByEmail(userEmail)).data)
    }
}