import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, NextRequest } from 'next/server'
import { apiAuthPrefix, dashboardRoutesPrefix, publicRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT_URL } from './routes';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    const user = await supabase.auth.getUser()

    const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
    const isDashboardRoute = request.nextUrl.pathname.startsWith(dashboardRoutesPrefix);
    const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);
    const short_url = request.nextUrl.pathname.split('/').pop();

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute && user) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, request.nextUrl));
    }
    
    if (!user && !isPublicRoute) {
        return Response.redirect(new URL("/login", request.nextUrl));
    }

    if (!isDashboardRoute && !isApiAuthRoute && !isAuthRoute) {
        const data = await fetch(
            `${request.nextUrl.origin}/api/url?short_url=${short_url}`,
        );

        if (data.status === 404) {
            console.log(`Short URL not found: ${short_url}`);
            return null;
        }

        const dataToJson = await data.json();

        if (dataToJson.original_url) {
            return Response.redirect(new URL(dataToJson.original_url as string).toString());
        }

    }

    return response
}

export const config = {
    matcher: [
        "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
        "/s/:short_url*",
    ],
};