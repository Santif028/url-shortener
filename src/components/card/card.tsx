import Link from "next/link"
import { useState } from "react"
import { DeleteIcon } from "@/icons/delete-icon"
import { UpdateIcon } from "@/icons/update-icon"
import { CopyIcon } from "@/icons/copy-icon"
import EditModal from "../modals/edit-modal"
import DeleteModal from "../modals/delete-modal"

interface CardProps {
    id: string,
    original_url: string,
    short_url: string,
    onDelete: () => Promise<void>
    onUpdate: (updatedUrl: string) => Promise<void>
}

export const Card = (props: CardProps) => {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [updatedUrl, setUpdatedUrl] = useState(props.original_url);

    const copyToClipboard = async (txt: string) => {
        try {
            const clipboardItem = new ClipboardItem({
                "text/plain": new Blob([txt], { type: "text/plain" }),
            });
            await navigator.clipboard.write([clipboardItem]);
        } catch (error) {
            await navigator.clipboard.writeText(txt);
        }
    };

    const handleUrlChange = (value: string) => {
        setUpdatedUrl(value);
    };

    const handleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };
    
    const handleEditModal = () => {
        setEditModal(!editModal);
    };

    const handleDeleteLink = async () => {
        try {
            await props.onDelete();
            setDeleteModal(!deleteModal);
        } catch (error) {
            console.error("Error deleting link:", error);
        }
    }

    const handleEditLink = async () => {
        try {
            await props.onUpdate(updatedUrl);
            setEditModal(false);
        } catch (error) {
            console.error("Error updating link:", error);
        }
    };

    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 overflow-hidden">

            <div className="flex items-center gap-5 mb-2">
                <Link href={`https://setsu-url-shortener.vercel.app/s/${props.short_url}`} target="_blank" className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{`/s/${props.short_url}`}</Link>
                <button title="Copy to clipboard" className="flex size-5 items-center justify-center text-gray-700 dark:text-gray-400 hover:scale-110 hover:text-white" onClick={() =>
                    copyToClipboard(`https://setsu-url-shortener.vercel.app/s/${props.short_url}`)
                }>
                    <CopyIcon />
                </button>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">{props.original_url}</p>
            <div className="flex gap-5">
                <button title="Delete" className="flex size-5 items-center justify-center text-gray-700 dark:text-gray-400 hover:scale-110 hover:text-red-500" onClick={handleDeleteModal}
                >
                    <DeleteIcon />
                </button>
                <button data-modal-target="default-modal" data-modal-toggle="default-modal" title="Update" className="flex size-5 items-center justify-center text-gray-700 dark:text-gray-400 hover:scale-110 hover:text-blue-500" type="button" onClick={handleEditModal}>
                    <UpdateIcon />
                </button>
            </div>
            <EditModal open={editModal} updated_url={updatedUrl} onClose={() => setEditModal(!editModal)} onSubmit={handleEditLink} setUpdatedUrl={handleUrlChange} />
            <DeleteModal open={deleteModal} onClose={() => setDeleteModal(!deleteModal)} onSubmit={handleDeleteLink} />
        </div>
    )
}
