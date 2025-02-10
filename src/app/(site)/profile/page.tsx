"use client";

import { SectionHeader } from "@/components/molecules";
import { UserForm, UserTabs } from "@/components/organisms";
import { UseProfile } from "@/components/UseProfile";
import { AuthUserType } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const session = useSession();
    const isAdmin = session?.data?.user?.role || ''

    const [isLoading, setIsLoading] = useState(false);
    
    const { loading: profileLoading, data: profileData } = UseProfile();
    const [user, setUser] = useState<AuthUserType>({
        id: '',
        name: '',
        credentialAccount: false,
        email: '',
        avatar: '/avatar1.png',
        phone: '',
        streetAddress: '',
        postalCode: '',
        city: '',
        country: '',
        role: '',
        isBlocked: false,
        emailIsVerified: false
    })

    const handleSubmit = (event: any) => {
        event.preventDefault();
    }

    useEffect(() => {
        if (profileData) {
            setUser(profileData);
        }
        console.log(user)
    }, [profileData])

    if (profileLoading) {
        return "Loading user info...";
    }

    return (
        <section>
            <UserTabs isAdmin={isAdmin} />
            <SectionHeader mainHeader="Profile" />
            <UserForm handleSubmit={handleSubmit} user={user} setUser={setUser} isLoading={isLoading} />
        </section>
    )
}