import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pass = request.cookies.get('pass')?.value
    // if (!pass && request.nextUrl.pathname.includes('/admin')) {
    //     return Response.redirect(new URL("/", request.nextUrl))
    // }
    return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};