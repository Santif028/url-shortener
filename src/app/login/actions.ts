'use client'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/server/supabase/client'

const supabase = createClient()

export async function login() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: 'http://localhost:3000/api/auth/callback'
        }
    })    
    if (error) {
        redirect('/error')
    }

    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
}

export async function logout() {
    await supabase.auth.signOut()
}

