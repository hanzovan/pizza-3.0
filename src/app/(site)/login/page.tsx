"use client";

import { SectionHeader } from "@/components/molecules";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();

    const {data: session} = useSession();
    
    const [callbackUrl, setCallbackUrl] = useState('/');

    useEffect(() => {
        setCallbackUrl(new URLSearchParams(window.location.search).get('callbackUrl') || '/');
    }, [])

    // If user already login, redirect user back to the callbackUrl
    useEffect(() => {
        if (session) {
            router.push(callbackUrl)
        }
    }, [session, router, callbackUrl])
    
    const initialState = {
        credentials: {
            email: "",
            password: ""
        },
        isLoading: false
    }
    const [state, setState] = useState(initialState);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({
            ...prev,
            credentials: {
                ...prev.credentials,
                [event.target.name]: event.target.value
            }
        }))
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setState(prev => ({
            ...prev,
            isLoading: true
        }))

        const loginPromise = new Promise(async (resolve, reject) => {
            setTimeout(async() => {
                try {
                    const response = await signIn("credentials", {
                        ...state.credentials,
                        redirect: false
                    });
                    if (response?.ok) {
                        resolve("Success")
                    } else {
                        reject(new Error(response?.error || "Sign in fail!"))
                    }
                } catch (error) {
                    console.log(error)
                    reject(
                        new Error(error instanceof Error ? error.message : 'An unknown error occurred')
                    )
                } finally {
                    setState(prev => ({
                        ...prev,
                        isLoading: false
                    }))
                }
            }, 1000)
        })
        toast.promise(loginPromise, {
            loading: "Loggin you in...",
            success: "Logged in successfully",
            error: (err: Error) => err.message
        }).catch(() => {})
    }

    const handleLoginWithGoogle = () => {
        try {
            setState(prev => ({
                ...prev,
                isLoading: true
            }))
            setTimeout(() => {
                signIn('google', {callbackUrl}).then(() => {
                    toast.success('Logged in with google successfully');
                })
            }, 500)
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
    return (
        <>
            <section>
                <SectionHeader mainHeader="Login" />
                <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                    <input name="email" type="email" placeholder="email" onChange={handleInputChange} disabled={state.isLoading} />
                    <input name="password" type="password" placeholder="password" onChange={handleInputChange} disabled={state.isLoading} />
                    <button type="submit" disabled={state.isLoading}>
                        Login
                    </button>
                    <p className="py-4 text-gray-500 text-center">
                        Or login with providers
                    </p>
                    <button onClick={handleLoginWithGoogle} type="button" className="flex gap-2 items-center justify-center bg-gray-200 border border-gray-300" disabled={state.isLoading}>
                        <Image src="/google.png" alt="google" width={32} height={32} />
                        Login with google
                    </button>
                    <div className="text-center text-gray-600 pt-4 border-t border-gray-300 mt-8">
                        Do not have an account?
                        <br />
                        <Link href="/register" className="underline">
                            Register here &raquo;
                        </Link>
                    </div>
                </form>
            </section>
        </>
    )
}