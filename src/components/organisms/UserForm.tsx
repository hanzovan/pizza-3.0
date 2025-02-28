import { UserFormProps } from "@/types";
import Image from "next/image";
import toast from "react-hot-toast";
import { UserAddress } from "./UserAddress";

export function UserForm ({
    handleSubmit,
    user,
    setUser,
    isLoading,
}: UserFormProps) {
    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files?.length === 1) {
            const data = new FormData();
            data.set('file', files[0]);

            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(async (response) => {
                if (response.ok) {
                    const newAvatarLink = await response.json();
                    setUser(prev => ({
                        ...prev,
                        avatar: newAvatarLink
                    }))
                } else {
                    throw new Error('Something went wrong');
                }
            })
            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Uploaded successfully!',
                error: 'Uploaded failed'
            })
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="md:flex gap-4 justify-center">
                <div className="flex gap-2 flex-col items-center">
                    <Image src={user.avatar ?? '/avatar1.png'} alt='avatar' width={160} height={160} className="rounded-lg mb-1" />
                    <label>
                        <input type="file" className="hidden" onChange={handleAvatarChange} />
                        <span className="border border-gray-300 bg-gray-200 px-2 py-2 rounded-lg hover:bg-white hover:text-gray-500 cursor-pointer text-gray-600 font-bold whitespace-nowrap">
                            Edit Avatar
                        </span>
                    </label>
                </div>
                <form className="grow" onSubmit={handleSubmit}>
                    <UserAddress user={user} setUser={setUser} isLoading={isLoading} />
                    <label>Role</label>
                    <input name="role" type="text" placeholder={user.role || 'user'} value={user.role} disabled={true} />
                    <button type="submit" disabled={isLoading}>
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}