import NextAuth from "next-auth"
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma";
import { getUserByID } from "@/lib/dbutils";

export const runtime = "nodejs";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    unstable_update,

} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    //callback for jwt
    // callbacks: {
    //     async jwt({ token, user: sessionUser }) {
    //         if (sessionUser) {
    //             token.role = (sessionUser as any).role || 'user';
    //             token.userId = sessionUser.id;
    //         }
    //         console.log("jwt", token)
    //         if (!token.sub) {
    //             return token
    //         }
    //         if (token.role == 'admin') {
    //             console.log("admin login detected");
    //             const admin = await prisma.admin.findUnique({
    //                 where: {
    //                     id: token.sub,
    //                 },
    //             });
    //             if (!admin) {
    //                 console.log("admin not found in db")
    //                 return token
    //             }
    //             token.user = { ...admin, role: "admin" };
    //         }
    //         else {
    //             console.log("executing user login")
    //             const user = await getUserByID(token.sub)
    //             if (!user) {
    //                 console.log("user not found in db")
    //                 return token
    //             }
    //             token.user = { ...user, role: "user" };
    //         }
    //         return token;
    //     },
    //     async session({ session, token }) {
    //         // console.log("session object", session)
    //         // console.log("session token ", token)
    //         session.user = token.user as any;
    //         // console.log("Session updated", session);
    //         return session;
    //     },
    //     async signIn({ user, account, credentials }) {
    //         if (credentials && 'role' in credentials) {
    //             //@ts-ignore
    //             user.role = credentials.role;
    //         }
    //         return true;
    //     }
    // },
    // callbacks: {
    //     async signIn({ account, user, credentials, email, profile }) {
    //         try {
    //             if (account?.provider === "google") {
    //                 return "/auth/error?error=accessDenied";

    //                 return true;
    //             }
    //             return true;
    //         } catch (error) {
    //             return `/auth/error?error=UnknownError`;
    //         }
    //     },
    //     // async redirect({ url, baseUrl }) {
    //     //   // Allows relative callback URLs
    //     //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //     //   // Allows callback URLs on the same origin
    //     //   else if (new URL(url).origin === baseUrl) return url;
    //     //   return baseUrl;
    //     // },

    //     async jwt({ token, session, trigger, user, account, profile }) {
    //         if (user) {
    //             if ("password" in user) {
    //                 const { password, ...userWithoutPass } = user;
    //                 token.user = userWithoutPass;
    //             } else {
    //                 token.user = user;
    //             }
    //         }
    //         return token;
    //     },
    //     async session({ session, user, token, newSession, trigger }) {
    //         session.user = token.user as any;
    //         return session;
    //     },
    // },
    // basePath: "/api/auth",
    ...authConfig
})