'use server'

import { getUser } from "@/server/utils/users";
import { CreateLink } from "./create-link-client";


export async function CreateLinkServer() {
    const user = await getUser();


    return  <CreateLink user={user} />
};
