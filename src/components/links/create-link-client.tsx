'use client'

import { useForm } from "react-hook-form";
import { checkIfShortUrlExist, createLink } from "@/server/actions/links"
import { ReactNode, useState } from "react";
import { User } from "@supabase/supabase-js";

interface LinksProps {
    original_url: string;
    short_url: string;
}

interface CreateLinkProps {
    children: ReactNode;
}


export function CreateLink({ user }: { user: User | null }) {
    const { register, handleSubmit, setValue, reset } = useForm<LinksProps>();

    const onSubmit = async (values: LinksProps) => {
        if (values.original_url === values.short_url) {
            console.log('URL and SHOR_URL cannot be the same');
            return
        }

        try {
            const shortUrlExists = await checkIfShortUrlExist(values.short_url);

            if (shortUrlExists) {
                console.log('SHORT_URL already exists');
                return
            };

            if (user) {
                await createLink(values, user);
            } else {
                console.error("User is null.");
                // Manejo de error o mensaje apropiado
            }
        } catch (error) {

        }

        reset();
    }




    const handleGenerateRandomShortUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const randomShortUrl = Math.random().toString(36).substring(7);
        setValue('short_url', randomShortUrl);
    };

    return (
        <div>
            <h1>Create Link</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label htmlFor="">Original URL</label>
                <input className="bg-black" type="text" {...register("original_url")} />
                <label htmlFor="">Short URL</label>
                <input className="bg-black" type="text" {...register("short_url")} />
                <button type="button" onClick={handleGenerateRandomShortUrl}>Generate Random Slug</button>
                <input type="submit" value="Create Link" />
            </form>
        </div>
    )
}