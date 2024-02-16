'use client'

import { getLinksByUser } from "@/server/actions/links";
import { Card } from "@/ui/card";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface LinksProps {
    id: string;
    original_url: string;
    short_url: string;
    created_at: Date;
    user_id: string;
}

const ShowLinks = ({ user }: { user: User | null }) => {
    const [links, setLinks] = useState<LinksProps[]>([]);

    useEffect(() => {
        async function fetchLinks() {
            if (user) {
                const fetchedLinks = await getLinksByUser(user);
                setLinks(fetchedLinks || []);
            }
        }

        fetchLinks();
    }, [links, user]);

    return (
        <div className="flex flex-wrap gap-5 p-5">

            {
                links
                    .map(link => {
                        return (
                            <Card original_url={link.original_url} short_url={link.short_url} key={link.id} />

                        );
                    })
            }
        </div>
    );
}

export default ShowLinks;


