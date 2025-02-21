import { UserService } from "@/lib/services";
import { roleCheck } from "@/lib/utils/roleCheck";

export async function GET() {
    const role = await roleCheck();
    if (role === 'admin') {
        const result = await UserService.findAllUsers();
        if (result.isError) {
            return Response.json({message: result.message}, {status: 400})
        }
        return Response.json(result.data, {status: 200})
    } else {
        return Response.json({message: "You are not authorized to do this!"}, {status: 500})
    }
}