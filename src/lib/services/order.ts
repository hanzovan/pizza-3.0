import { OrderModel } from "@/database/models";
import { OrderType } from "@/types";

const createOrder = async (body: OrderType) => {
    try {
        const newOrder = await OrderModel.create(body)
        return {
            isError: false,
            data: newOrder,
            message: "New order was created successfully"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const findOneOrder = async (_id: string) => {
    try {
        const order = await OrderModel.findOne({_id})
        return {
            isError: false,
            data: order,
            message: "Order founded"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const findAllOrders = async () => {
    try {
        const allOrders = await OrderModel.find()

        return {
            isError: false,
            data: allOrders,
            message: "Found all orders successfully"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const findAllOrdersByEmail = async(email: string) => {
    try {
        const orders = await OrderModel.find({email})
        return {
            isError: false,
            data: orders,
            message: "Founded orders by email"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const updateOrder = async (_id: string, newInfo: Partial<OrderType>) => {
    try {
        const newData = await OrderModel.updateOne({_id}, {$set: newInfo})
        return {
            isError: false,
            data: newData,
            message: "Updated order successfully"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const OrderService = { createOrder, findAllOrders, findOneOrder, findAllOrdersByEmail, updateOrder }

export { OrderService };