import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const fileInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const { selectedUser, sendMessage } = useChatStore();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof(reader.result) === "string")
                setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview("");
        if (fileInputRef.current) fileInputRef.current.files = null;
    };

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        if (!fileInputRef.current?.files) return;

        try {
            const formData = new FormData();
            formData.append("id", selectedUser!._id)
            formData.append("text", text.trim());
            formData.append("image", fileInputRef.current.files[0]);

            await sendMessage(formData);

            // Clear form
            setText("");
            setImagePreview("");
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                                flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2"
            >
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`flex btn btn-circle
                         ${
                             imagePreview ? "text-emerald-500" : "text-zinc-400"
                         }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle box-content p-1.5"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
