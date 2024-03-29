
import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/server/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}