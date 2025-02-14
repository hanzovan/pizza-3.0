import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/authOptions";
import { UserService } from "@/lib/services";

export async function GET(req: NextRequest) {
    // verify user
    
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    let filterUser = {};
    if (_id) {
        filterUser = {_id}
    } else {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        if (!email) {
            return Response.json({});
        }
        filterUser = {email}
    }
    const result = await UserService.findUser(filterUser)

    if (result.isError) {
        return Response.json({ message: result.message }, {status: 400})
    }

    return Response.json(result.data, {status: 200});
}

export async function PUT(req: NextRequest) {
    const data = await req.json();

    const session = await getServerSession(authOptions)

    if (!session) {
        return Response.json({ message: 'Please log in to continue'}, {status: 400})
    }
    
    const userEmail = session?.user?.email

    const modifiedUserEmail = data?.email

    const password = data?.password

    const role = session?.user?.role

    if (password) {
        return Response.json({ message: 'Currently we do not allow change your password'}, {status: 500})
    }

    if ((userEmail !== modifiedUserEmail) && role !== 'admin') {
        return Response.json({ message: 'You are not allowed to do this!'}, {status: 500})
    }
    
    const result = await UserService.updateUser(data)

    if (result.isError) {
        return Response.json({ message: result.message }, {status: 400})
    }

    return Response.json(result.data, {status: 200})
}