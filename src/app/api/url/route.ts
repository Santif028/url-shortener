import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/server/supabase/server";

export const GET = async (req: NextRequest) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore)

    const params = req.nextUrl.searchParams.get("short_url");
    const newHeaders = new Headers(req.headers);

    if (!params || typeof params !== "string") {
        return NextResponse.json(
            { error: "Error: No slug provided." },
            { status: 500 },
        );
    }

    const { data }= await supabase
        .from("links")
        .select("*")
        .eq("short_url", params)
        .single();

    if (!data) {
        return NextResponse.json(
            { error: "Error: Short URL not found or invalid." },
            { status: 404 },
        );
    }

    newHeaders.set("cache-control", "public, max-age=31536000, immutable");

    return NextResponse.json(data, {
        headers: newHeaders,
    });
};