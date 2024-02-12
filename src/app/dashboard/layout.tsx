'use server'

import type { ReactNode } from "react";

/* import Container from "@/ui/container";
import { Button } from "@/ui/button";
import { PlusIcon } from "lucide-react";

import DashboardRoutesComponent from "@/components/dashboard-routes";*/
import { CreateLink } from "@/components/links/create-link-client";
import { getUserBySession } from "@/server/utils/users";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = async (props: DashboardLayoutProps) => {
    const user = await getUserBySession();

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