import { MenuItemService } from "@/lib/services";
import { roleCheck } from "@/lib/utils/roleCheck";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json()
    const role = await roleCheck()
    if (role === 'admin') {
        const result = await MenuItemService.createMenuItem(data)
        if (result?.isError) {
            return Response.json({message: result.message}, {status: 400})
        }
        return Response.json({ message: "new item was created successfully"}, {status: 200})
    } else {
        return Response.json({ message: "You are not authorized to do this"}, {status: 500})
    }
}

export async function GET() {
    const result = await MenuItemService.findAllMenuItems()
    if (result.isError) {
        return Response.json({ message: result.message}, {status: 400})
    }
    return Response.json(result.data, {status: 200})
}

export async function PUT(req: NextRequest) {
    const role = await roleCheck();
    if (role === 'admin') {
        const {id, ...data} = await req.json();

        const updatedMenuItem = await MenuItemService.updateMenuItem(id, data);
        if (updatedMenuItem.isError) {
            return Response.json({message: updatedMenuItem.message}, {status: 400})
        }
        return Response.json({message: 'Update item successfully'}, {status: 200})
    } else {
        return Response.json({message: 'You are not authorized to do this'}, {status: 500})
    }
}

export async function DELETE(req: NextRequest) {
    const role = await roleCheck();
    if (role === 'admin') {
        const _id = await req.json()
        const result = await MenuItemService.deleteMenuItem(_id)
        if (result.isError) {
            return Response.json({message: result.message}, {status: 400})
        }
        return Response.json({message: result.message}, {status: 200})
    } else {
        return Response.json({message: "You are not authorized to do this"}, {status: 500})
    }
}