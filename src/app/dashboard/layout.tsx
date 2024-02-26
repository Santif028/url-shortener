'use server'

import type { ReactNode } from "react";

import { CreateLink } from "@/components/links/create-link-client";
import { getUser } from "@/server/utils/users";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = async (props: DashboardLayoutProps) => {
    const user = await getUser();

    if(user === null) {
        redirect('/login')
    }

    return (
        <>
        
            <nav className="border-b border-gray-100 bg-gray-50 dark:border-neutral-800 dark:bg-neutral-800/50">

                <div className="mx-auto">
                    <div className="flex w-full items-center justify-between">
                        <div className="mt-0 flex flex-row space-x-0 text-sm font-medium rtl:space-x-reverse">

                        </div>
                        <CreateLink user={user} >

                        </CreateLink>
                    </div>
                </div>
            </nav>
            <div>{props.children}</div>
        </>
    );
};

export default DashboardLayout;