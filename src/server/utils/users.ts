
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export const getUserBySession = async () => {
    try {
        const { data } = await supabase.auth.getUser();
        const user = data.user
        return user;
    } catch {
        return null;
    }
};