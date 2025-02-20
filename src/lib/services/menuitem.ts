import { MenuItemModel } from "@/database/models";
import { MenuItemType } from "@/types";

const createMenuItem = async (body: MenuItemType) => {
    try {
        const newItem = await MenuItemModel.create(body)
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const findOneMenuItem = async (_id: string) => {
    try {
        const item = await MenuItemModel.findOne({_id})
        return {
            isError: false,
            data: item,
            message: "Item founded!"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const findAllMenuItems = async () => {
    try {
        const allMenuItems = await MenuItemModel.find()

        return {
            isError: false,
            data: allMenuItems,
            message: "Find all menu items successfully"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const updateMenuItem = async (_id: string, newInfo: MenuItemType) => {
    try {
        const newData = await MenuItemModel.updateOne({_id}, {$set: newInfo})
        return {
            isError: false,
            data: newData,
            messge: "Updated menu items successfully"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const deleteMenuItem = async (_id: string) => {
    try {
        await MenuItemModel.deleteOne({_id});
        return {
            isError: false,
            data: null,
            message: "Menu item deleted!"
        }
    } catch (error) {
        return {
            isError: true,
            data: null,
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

const MenuItemService = { createMenuItem, findAllMenuItems, findOneMenuItem, updateMenuItem, deleteMenuItem };

export { MenuItemService };