'use server'

import { getUserBySession } from "@/server/utils/users";
import { CreateLink } from "./create-link-client";


export async function CreateLinkServer() {
    const user = await getUserBySession();


    return  <CreateLink user={user} />
};
