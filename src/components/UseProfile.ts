import { AuthUserType } from "@/types";
import { useEffect, useState } from "react";

export function UseProfile() {
    const [data, setData] = useState<AuthUserType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("/api/profile").then(response => {
            response.json().then(result => {
                setData(result.data);
                setLoading(false);
            })
        })
    }, [])

    return {loading, data};
}