import { cookies } from "next/headers";
import { createClient } from "../utils/supabase/server";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function getLinks() {
    const { data: links } = await supabase.from('links').select('*');

    return links
}

export async function getSession(){
    const { data: session } = await supabase.auth.getSession();

    return session;
}