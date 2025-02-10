import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/authOptions";
import { UserService } from "@/lib/services";

export async function GET(req: NextRequest) {
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

    return Response.json(result);
}