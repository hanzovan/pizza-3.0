"use client";

import { AppProviderProps } from "@/types";
import { SessionProvider } from "next-auth/react";

export function AppProvider({children}: AppProviderProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}