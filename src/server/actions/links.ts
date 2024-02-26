import { User } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";

const supabase = createClient()

interface CreateLink {
    original_url: string;
    short_url: string;
    user_id?: string;
}

export const getLinksByUser = async (user: User) => {
    if (!user) {
        console.error("Not authenticated.");
        return null;
    }

    const { data, error } = await supabase.from('links').select('*').eq('user_id', user.id).order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching links:", error.message);
        return null;
    }

    return data
};

export const getSingleLink = async (id: string, user: User) => {

    if (!user) {
        console.error("Not authenticated.");
        return null;
    }

    const { data, error } = await supabase.from('links').select('*').eq('id', id).eq('user_id', user.id);

    if (error) {
        console.error("Error fetching link:", error.message);
        return null;
    }

    return data
};

export const checkIfShortUrlExist = async (short_url: string) => {
    try {
        const { data, error } = await supabase
            .from('links')
            .select('*')
            .eq('short_url', short_url);

        if (error) {
            console.error("Error al buscar el short URL:", error.message);
            return false;
        }

        if (data.length === 0) {
            return false;
        }
        return true;
    } catch (error: any) {
        console.error("Error inesperado al buscar el short URL:", error.message);
        return false;
    }
};

export const createLink = async (values: CreateLink, user: User) => {

    if (!user) {
        console.error("Not authenticated.");
        return null;
    }

    // Create new link:
    const { error } = await supabase.from('links').insert({
        original_url: values.original_url,
        short_url: values.short_url,
        user_id: user.id
    });

    if (error) {
        console.error("Error creating link:", error.message);
        return null;
    }

};


export const updateLink = async (id: string, updated_url: string, user: User) => {
    if (!user) {
        console.error("Not authenticated.");
        return null;
    }

    // Actualiza el link:
    const { data, error } = await supabase
        .from('links')
        .update({ original_url: updated_url })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        console.error("Error updating link:", error.message);
        return null;
    }

    return data;
};


export const deleteLink = async (id: string, user: User) => {

    if (!user) {
        console.error("Not authenticated.");
        return null;
    }

    // Update link:
    const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        console.error("Error deleting link:", error.message);
        return null;
    }

};