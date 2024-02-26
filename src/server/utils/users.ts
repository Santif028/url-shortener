import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

export const getUser = async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    try {
        const { data, error } = await supabase.auth.getUser()
        if (error || !data?.user) {
            redirect('/')
        }
        const user = data.user
        return user;
    } catch {
        return null;
    }
};