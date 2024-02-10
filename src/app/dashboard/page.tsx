'use client'

import { cookies } from "next/headers";
import { createClient } from "../utils/supabase/server"
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next/types";
import { getSession } from "./actions";

interface Link {
    id: string,
    original_url: string,
    short_url: string,
    created_at: Date,
    user_id: string,
}

const DashboardPage = () => {
    const [links, setLinks] = useState<Link[]>([])



    return (
        <div className="flex justify-center items-center h-screen">
            <h1>Welcome { } </h1>
            <div>

            </div>
        </div>
    )
}


/* export const getServerSideProps: GetServerSideProps = async () => {
    const session = await getSession();

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}; */

export default DashboardPage