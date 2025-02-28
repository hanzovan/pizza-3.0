"use client";

import { useSearchParams } from "next/navigation";

export function SearchParamsHandler() {
    const searchParams = useSearchParams();
    return searchParams.get('callbackUrl') || "/";
}
