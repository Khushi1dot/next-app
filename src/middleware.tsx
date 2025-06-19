import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";


export function middleware(request: NextRequest) {

    const token = request.cookies.get("access_token")?.value;
    const getAuth = request.cookies.get("isAuthenticated")?.value;

    const verified = token && verifyToken(token);

    if (!verified && !getAuth) {

        return NextResponse.redirect(new URL("/login", request.url));

    }

    return NextResponse.next();
}

// Only protect /home
export const config = {
    matcher: ["/home"],
};
