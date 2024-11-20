import authConfig from "./auth.config"
import NextAuth from "next-auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    adminRoutes,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"
import { CurrentRole } from "./lib/auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const role = CurrentRole()
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isAdminRoute = adminRoutes.includes(nextUrl.pathname)
    const isCheckoutPage = nextUrl.pathname === '/checkout';
    const isPurchaseSuccessPage = nextUrl.pathname === '/stripe/purchase-success';

    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return;
    }

    if (isCheckoutPage) {
        if (!isLoggedIn) {
            let callbackUrl = nextUrl.pathname;
            if (nextUrl.search) {
                callbackUrl += nextUrl.search;
            }
    
            const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    
            return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
        }
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
    }

    if (isAdminRoute && await role !== "ADMIN") {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }

    if (isCheckoutPage) {
        const proceedToCheckout = req.cookies.get('proceedToCheckout');
        if (!proceedToCheckout) {
            return NextResponse.redirect(new URL('/', nextUrl));
        }
    }

    if (isPurchaseSuccessPage) {
        const proceedToPurchaseSuccess = req.cookies.get('proceedToPurchaseSuccess');
        if (!proceedToPurchaseSuccess) {
            return NextResponse.redirect(new URL('/', nextUrl));
        }
    }



    return;
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}