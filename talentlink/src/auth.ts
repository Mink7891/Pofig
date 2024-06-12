import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

declare module "next-auth" {
    interface Session {
        user: {
            address: string
        } & DefaultSession["user"];
    }
}


async function getUserFromDb(email: string): Promise<User | null> {
    try {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    } catch (error) {
        throw new Error("Не удалось получить пользователя.");
    }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials: { email: string; password: string;}) => {
                let user = null;

                user = await getUserFromDb(credentials.email);

                if (!user) {
                    throw new Error("Пользователь не найден.");
                }

                // For hash password
                const passwordIsMatch = await bcrypt.compare(credentials.password, user.password);
                console.log("Password math ", passwordIsMatch);
                console.log(user.password, credentials.password);

                // Without hash match
                // const passwordIsMatch = user.password === credentials.password;

                if (!passwordIsMatch) {
                    throw new Error("Неверный пароль");
                }


                return user;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("SignIn callback:", { user, account, profile });
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            console.log("Session Callback: ", session);
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
});