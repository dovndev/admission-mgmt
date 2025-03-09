import NextAuth from "next-auth";
import authConfig from "./auth/auth.config";
import { protectedRoutes } from "./routes";


const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    console.log("middleware called on", req.nextUrl.pathname)
    console.log("middleware called with auth", req.auth)
    const isLoggedIn = !!req.auth;
    const isAuthRoute = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
    const isApiAuthRoute = req.nextUrl.pathname.includes("/api");
    const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);
    //middleware logic
    if (isApiAuthRoute) {
        return
    }
    if (isLoggedIn && isAuthRoute) {
        console.log("redirecting to onboarding")
        return Response.redirect(new URL("/onboarding", req.url))
    }
    if (!isLoggedIn && !isAuthRoute) {
        console.log("redirecting to login")
        return Response.redirect(new URL("/login", req.url))
    }
    if (isProtectedRoute && !isLoggedIn) {
        console.log("redirecting to login")
        return Response.redirect(new URL("/login", req.url))
    }
})




export const config = {
    matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"],
};