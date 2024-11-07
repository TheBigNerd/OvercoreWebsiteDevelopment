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
    "/business",
    "/checkout",
    "/stripe/purchase success",
    "/pre-builds/view/*",
    "/pre-builds/view/9b48d59a-5436-4597-80f1-22859f51bd6e",
    "/pre-builds/view/9011f18e-1e1d-4103-a118-bacce34c58c7",
    "/pre-builds/view/a565c781-5690-4af9-be93-5ab094fbb66e",
    "/pre-builds/view/872a71ed-811d-4fae-9955-ae3d6b366baf",
    "/pre-builds/view/1aaad063-47d7-4aad-8e1f-4da68a984106",    
    "/pre-builds/view/348c1f4d-3703-4bd3-a880-755d86d2c4da",
    "/pre-builds/view/76d67cd3-8ac9-4bbb-9aa3-4bd9c50950e2"
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

export const checkoutRoutes = [
    "/checkout",
    "/stripe/purchase success"
]