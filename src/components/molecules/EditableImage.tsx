import Image from "next/image";
import toast from "react-hot-toast";

interface EditableImageProps {
    link: string | undefined,
    setLink: (link: string) => void;
}

export function EditableImage({link, setLink}: EditableImageProps) {
    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files?.length === 1) {
            const data = new FormData();
            data.set("file", files[0]);

            const uploadPromise = fetch("/api/upload", {
                method: "POST",
                body: data
            }).then(async (response) => {
                if (response.ok) {
                    return response.json().then(link => {
                        setLink(link);
                    })
                }
                throw new Error("Something went wrong");
            })

            await toast.promise(
                uploadPromise,
                {
                    loading: "Uploading...",
                    success: "Uploaded successfully",
                    error: (err: Error) => err.message
                }
            )
        }
    }
    return (
        <div>
            {link && (
                <Image src={link} alt="item" width={120} height={120} className="rounded-lg mb-1 w-full h-full" />
            )}
            {!link && (
                <div className="bg-gray-200 p-4 text-gray-600 rounded-lg mb-1">
                    No image
                </div>
            )}
            <label>
                <input type="file" className="hidden" onChange={handleAvatarChange} />
                <span className="block border rounded-lg px-2 py-2 text-center bg-gray-100 border-gray-200 text-gray-600 hover:bg-white cursor-pointer">
                    Edit Image
                </span>
            </label>
        </div>
    )
}