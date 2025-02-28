"use client";

import { SectionHeader } from "@/components/molecules";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const router = useRouter();
    const initialState = {
        credentials: {
            email: "",
            password: "",
            confirm_password: "",
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
        // Disable normal form behavior
        event.preventDefault();

        // disable inputs and buttons
        setState(prev => ({
            ...prev,
            isLoading: true
        }))

        // send data to backend, use toast to get the notify to user, use setTimeout to delay response
        const registeringPromise = new Promise(async (resolve, reject) => {
            setTimeout(async() => {
                try {
                    const response = await fetch("/api/register", {
                        method: "POST",
                        body: JSON.stringify(state.credentials),
                        headers: {"Content-Type": "application/json"}
                    })

                    console.log(response);

                    if (response.ok) {
                        resolve("Success")
                    } else {
                        const errorData = await response.json()
                        reject(new Error(errorData.message || "Some error occurred"))
                    }
                } catch (error) {
                    reject(new Error(error instanceof Error ? error.message : 'An unknown error occurred'));
                } finally {
                    setState(prev => ({
                        ...prev,
                        isLoading: false
                    }))
                }
            }, 1000)
        })
        toast.promise(
            registeringPromise,
            {
                loading: "Registering...",
                success: "User registered successfully",
                error: (err: Error) => err.message
            }
        ). then(async () => {
            await signIn('credentials', {
                ...state.credentials,
                redirect: false
            })
        }).then(() => {
            router.push('/');
        }).catch(() => {})
    }

    const handleLoginWithGoogle = () => {
        try {
            setState(prev => ({
                ...prev,
                isLoading: true
            }));
            setTimeout(() => {
                signIn('google', {callbackUrl: '/'}).then(() => {
                    toast.success('Logged in with google successfully')
                })
            }, 500)
            
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }

    return (
        <>
            <section>
                <SectionHeader mainHeader="Register" />
                <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                    <input name="email" type="email" placeholder="email" onChange={handleInputChange} disabled={state.isLoading} />
                    <input name="password" type="password" placeholder="password" onChange={handleInputChange} disabled={state.isLoading} />
                    <input name="confirm_password" type="password" placeholder="confirm password" onChange={handleInputChange} disabled={state.isLoading} />
                    <button type="submit" disabled={state.isLoading}>
                        Register
                    </button>
                    <p className="py-4 text-gray-500 text-center">
                        Or login with providers
                    </p>
                    <button onClick={handleLoginWithGoogle} type="button" className="flex gap-2 items-center justify-center bg-gray-200 border border-gray-300" disabled={state.isLoading}>
                        <Image src="/google.png" alt="google" width={32} height={32} />
                        Login with google
                    </button>
                    <div className="text-center text-gray-600 pt-4 border-t border-gray-300 mt-8">
                        Already have an account?
                        <br />
                        <Link href="/login" className="underline">
                            Login here &raquo;
                        </Link>
                    </div>
                </form>
            </section>
        </>
    )
}