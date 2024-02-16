/**
 * These routes do not require authentication.
 */
export const publicRoutes: string[] = ["/", "verify"];


/**
 * These routes are used for the dashboard.
 * Required for authentication.
 * Only type the prefix.
 */
export const dashboardRoutesPrefix: string = "/dashboard";

/**
 * These prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect URL after logging in.
 */
export const DEFAULT_LOGIN_REDIRECT_URL: string = "/dashboard";


/**
 * The default URL if you're not logged in.
 */
export const DEFAULT_LOGIN_URL: string = "/login";