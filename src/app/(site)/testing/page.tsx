import { authOptions } from "@/app/api/auth/authOptions"
import { getServerSession } from "next-auth"

export default function TestingPage() {
    const session = getServerSession(authOptions);
    console.log(session);
    return (
        <div>
            testing
        </div>
    )
}