import {NextResponse} from "next/server";
import UserUtils from "./utils/UserUtilities";

export async function middleware(request) {
    // check if the request is for the login page
    if (request.nextUrl.pathname.startsWith("/login")) {
        // redirect to the dashboard if the user is already logged in
        const rememberMe = request.cookies.get('rememberMe')?.value;
        const accessToken = request.cookies.get('accessToken')?.value;
        if (!rememberMe || !accessToken || rememberMe === "false") {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        const accessToken = request.cookies.get('accessToken')?.value;
        if (!accessToken) {
            return NextResponse.redirect(new URL("/error/404", request.url));
        } else {
            try {
                const data = await UserUtils.authGuard(request);
                if (!data) {
                    return NextResponse.redirect(new URL('/error/404', request.url));
                }
                // log the url of the request
                console.log('Middleware for url: ', request.url);
                return NextResponse.next();
            } catch (error) {
                console.error(error.message)
                return NextResponse.redirect(new URL('/error/404', request.url));
            }
        }
    }
    return NextResponse.next();
}
