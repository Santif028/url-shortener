'use client'

import { getLinksByUser, updateLink } from "@/server/actions/links";
import { deleteLink } from "@/server/actions/links";
import { Card } from "@/components/card/card";
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

    const handleOnDelete = async (id: string) => {
        if (user) {
            try {
                await deleteLink(id, user);
            } catch (error) {
                console.log('Error deleting link:', error);
            }
        }
    }

    const handleOnUpdate = async ( id:string, updated_url: string ) => {
        if(user) {
            try {
                await updateLink(id, updated_url, user)
            } catch (error) {
                 
            }
        }
    }

    return (
        <div className="flex flex-wrap gap-5 p-5">

            {
                links
                    .map(link => {
                        return (
                            <Card original_url={link.original_url} short_url={link.short_url} key={link.id} onDelete={() => handleOnDelete(link.id)} id={link.id} onUpdate={(updated_url)=> handleOnUpdate(link.id, updated_url)}/>

                        );
                    })
            }
        </div>
    );
}

export default ShowLinks;
