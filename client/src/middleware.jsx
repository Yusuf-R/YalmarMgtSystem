import {NextResponse} from "next/server";
import Cookies from "js-cookie";

export function middleware(request) {
    // check if the request is for the login page
    if (request.nextUrl.pathname.startsWith("/login")) {
        // redirect to the dashboard if the user is already logged in
        const rememberMe = request.cookies.get('rememberMe')?.value;
        const accessToken = request.cookies.get('accessToken')?.value;
        if (!rememberMe || !accessToken || rememberMe === "false") {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }
    }
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        const accessToken = request.cookies.get('accessToken')?.value;
        if (!accessToken) {
            return NextResponse.redirect(new URL("/error/404", request.url));
        } else {
            return NextResponse.next();
        }
    }
    return NextResponse.next();
}
