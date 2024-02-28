'use client'

import { redirect } from 'next/navigation'

import { createClient } from '@/server/supabase/client'

const supabase = createClient()

export async function login() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: 'https://setsu-url-shortener.vercel.app/api/auth/callback'
        }
    })
    if (error) {
        redirect('/error')
    }
}

export async function logout() {
    await supabase.auth.signOut()
    
}
