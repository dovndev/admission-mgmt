import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            role?: string;
        } & DefaultSession["user"];
    }

    interface User {
        role?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
        userId?: string;
        user?: {
            role?: string;
            [key: string]: any;
        };
    }
}