/**
 * An Array of routes accessible to the public, these do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/sign-in",
    "/ccompleted",
    "/custom-builds",
    "/pre-builds",
    "/about-us",
    "/contact",
    "/error",
    "/favourites",
    "/basket",
    "/business"
];
/**
 * An Array of routes used for authentication, these are routes redirect users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
    "/auth/orders"
]
/**
 * The prefix for Api authentication routes
 * routes started with this prefix are used for api authentication stuff
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"
/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"

export const adminRoutes = [
    "/admin",
    "/admin/products",
]