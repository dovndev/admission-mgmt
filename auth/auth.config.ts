import { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { userLoginSchema } from "@/schemas";
import { compare } from "bcryptjs";
import { prisma } from "@/prisma/prisma";

const { ADMIN_EMAIL, ADMIN_DASHBOARD_PASSWORD } = process.env;
export default {
    // trustHost: true,
    // pages: {
    //     signIn: "/auth/login",
    // },
    providers: [
        Credentials({
            // name: "credentials",
            // credentials: {
            //     email: {
            //         label: "email",
            //         type: "email",
            //         placeholder: "johndoe@gmail.com",
            //     },
            //     password: {
            //         label: "password",
            //         type: "password",
            //         placeholder: "token",
            //     },
            // },
            // type: "credentials",
            async authorize(credentials, _request) {
                const validCredentials = userLoginSchema.safeParse(credentials);
                if (!validCredentials.success) {
                    return null;
                }
                const { email, password } = validCredentials.data;
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
                if (!user || !user.password || !user.email) {
                    return null;
                }
                const passMatch = await compare(password, user.password);
                if (passMatch) {
                    return user;
                }
                return null;
            },

        }),
    ],
} satisfies NextAuthConfig;