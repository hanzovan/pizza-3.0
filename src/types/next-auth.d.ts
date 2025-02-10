import { Session } from "next-auth";
import { CustomSessionUser } from ".";

declare module "next-auth" {
    interface Session {
        user: CustomSessionUser;
    }
}