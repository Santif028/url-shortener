import type { NextRequest } from "next/server";
import {
    DEFAULT_LOGIN_REDIRECT_URL,
    apiAuthPrefix,
    dashboardRoutesPrefix,
    publicRoutes,
} from "./routes";

export const middleware = async (req: NextRequest) => {
    try {
        const { nextUrl } = req;
        const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
        const isDashboardRoute = nextUrl.pathname.startsWith(dashboardRoutesPrefix);
        const shortUrlRoute = req.nextUrl.pathname.split("/").pop();

        // Check ``slug`` route.
        if (!isDashboardRoute && !isApiAuthRoute) {
            const data = await fetch(
                `${req.nextUrl.origin}/api/url?slug=${shortUrlRoute}`,
            );

            if (data.status === 404) {
                console.log(`Slug not found: ${shortUrlRoute}`);
                return null;
            }

            const dataToJson = await data.json();

            if (dataToJson.url) {
                return Response.redirect(new URL(dataToJson.url as string).toString());
            }
        }

        return null;
    } catch (error) {
        console.log("Error in middleware:", error);
        return new Response("Internal Server Error", { status: 500, });
    }
};

export const config = {
    matcher: [
        "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
        "/s/:slug*",
    ],
};