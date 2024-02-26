import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export const getUser = async () => {
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