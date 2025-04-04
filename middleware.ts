import NextAuth from "next-auth";
import authConfig from "./auth/auth.config";
import { protectedRoutes } from "./routes";


const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    console.log("middleware called on", req.nextUrl.pathname)
    console.log("middleware called with auth", req.auth?.user)
    const isLoggedIn = !!req.auth;
    const isAuthRoute = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register") || req.nextUrl.pathname.startsWith("/forgotpassword") || req.nextUrl.pathname.startsWith("/reset-password");
    const isApiAuthRoute = req.nextUrl.pathname.includes("/api");
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);
    const isHomePage = req.nextUrl.pathname === "/";
    //middleware logic
    if (isApiAuthRoute) {
        return
    }
    if (isAdminRoute && !isLoggedIn) {
        console.log("redirecting to login")
        return Response.redirect(new URL("/login?admin=true", req.url))
    }
    console.log("admin",req.auth)
    if (isAdminRoute && isLoggedIn) {
        console.log("redirecting to admin dashboard")
        //@ts-ignore
        
        const isAdmin = req.auth?.user?.role === "admin"//ignore the type check because we know it will be there
        if (isAdmin) {
            console.log("admin found")
            return Response.redirect(new URL("/admin/adminHome", req.url))
        }
        else {
            console.log("admin not found \nredirecting to landing")
            console.log("Auth token structure:", JSON.stringify(req.auth, null, 2));
            return Response.redirect(new URL("/", req.url))
        }
    }
    if (isHomePage) {
        return; // Let the request continue without redirection
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
    matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mov)).*)"],
};