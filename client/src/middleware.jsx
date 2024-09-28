import {NextResponse} from "next/server";
import AdminUtils from "./utils/AdminUtilities";

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
                const data = await AdminUtils.authGuard(request);
                if (!data || data instanceof Error) {
                    // clear the cookies for accessToken and rememberMe
                    const response = NextResponse.redirect(new URL('/error/404', request.url));
                    response.cookies.set('accessToken', null, {maxAge: 0, path: '/'});
                    response.cookies.set('rememberMe', null, {maxAge: 0, path: '/'});
                    return response;
                }
                // log the url of the request
                console.log('Middleware for url: ', request.url);
                return NextResponse.next();
            } catch (error) {
                return NextResponse.redirect(new URL('/error/404', request.url));
            }
        }
    }
    return NextResponse.next();
}
