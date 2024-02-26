'use client'

import CreateModal from "../modals/create-modal";
import { useState } from "react";
import { User } from "@supabase/supabase-js";


export function CreateLink({ user }: { user: User | null }) {
    const [createModal, setCreateModal] = useState(false);

    const handleCreateModal = () => {
        setCreateModal(!createModal);
    };

    return (
        <div>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={handleCreateModal}>
                <span className="relative flex px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                    Create Link
                </span>
            </button>

            <CreateModal open={createModal} onClose={() => setCreateModal(!createModal)} user={user} />
        </div >
    )
}