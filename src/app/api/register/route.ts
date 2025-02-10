import { strongPassword } from "@/lib/utils"
import mongoose from "mongoose"
import { NextRequest } from "next/server"
import { UserService } from "@/lib/services";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const plainPassword = body.password
        const confirm_password = body.confirm_password

        if (!strongPassword(plainPassword)) {
            return Response.json({ message: "Password is not strong enough"}, {status: 400})
        }

        if (plainPassword !== confirm_password) {
            return Response.json({ message: "Password confirm does not match!"}, {status: 400})
        }

        const createNewUser = await UserService.createUser(body);
        if (createNewUser.isError) return Response.json({ message: createNewUser.message}, {status: 400})

        return Response.json({ message: createNewUser.message}, {status: 201})
    } catch(error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const errorMessage = Object.values(error.errors).map(err => err.message);
            return Response.json({ message: errorMessage.join(", ")}, {status: 400})
        } else {
            console.log(error);
            return Response.json({ message: "An unknown error occurred"}, {status: 500})
        }
    }
}