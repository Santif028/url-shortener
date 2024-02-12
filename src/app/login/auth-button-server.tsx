import AuthButton from './auth-button-client';
import { cookies } from 'next/headers';
import { createClient } from '@/server/supabase/server';

export async function AuthButtonServer() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: {user} } = await supabase.auth.getUser();
    
    return <AuthButton user={user} />

}

