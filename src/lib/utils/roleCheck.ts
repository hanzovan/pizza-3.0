import { authOptions } from "@/app/api/auth/authOptions";
import { UserModel } from "@/database/models";
import { getServerSession } from "next-auth";

export async function roleCheck() {
    const session = await getServerSession(authOptions)
    if (session) {
        return session.user.role
    }
    return 'visitor';
}