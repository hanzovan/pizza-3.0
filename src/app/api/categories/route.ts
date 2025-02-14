import { CategoryService } from "@/lib/services";
import { roleCheck } from "@/lib/utils/roleCheck";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const role = await roleCheck();
    if (role === 'admin') {
        const result = await CategoryService.createCategory(body)
        if (result.isError) {
            return Response.json({message: result.message}, {status: 400})
        }
        return Response.json(result.data, {status: 200})
    } else {
        return Response.json({message: "You are not authorized to do this"}, {status: 500})
    }
}

export async function GET() {
    const result = await CategoryService.findAllCategories()
    if (result.isError) {
        return Response.json({message: result.message}, {status: 400})
    }
    return Response.json(result.data, {status: 200})
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const role = await roleCheck();
    if (role === 'admin') {
        const result = await CategoryService.updateCategory(body._id, body.name)
        if (result.isError) {
            return Response.json({message: result.message}, {status: 400})
        }
        return Response.json(result.data, {status: 200})
    } else {
        return Response.json({message: "You are not authorized to do this"}, {status: 500})
    }
}

export async function DELETE(req: NextRequest) {
    const role = await roleCheck();
    if (role === 'admin') {
        const _id = await req.json();
        const result = await CategoryService.deleteCategory(_id)
        if (result.isError) {
            return Response.json({message: result.message}, { status: 400})
        }
        return Response.json(result.message, {status: 200})
    } else {
        return Response.json({message: "You are not authorized to do this"}, {status: 500})
    }
}