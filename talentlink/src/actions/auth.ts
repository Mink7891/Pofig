"use server";


import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RegisterSchema } from "@/lib/formShemas";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/news",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.cause?.err instanceof Error) {
                return error.cause.err.message; // return "custom error"
            }
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials";
                default:
                    return "Something went wrong";
            }
        }
        throw error;
    }
}

export interface RegisterState {
    errors?: {
        email?: string[];
        password?: string[];
        username?: string[]
    },
    message?: string;
}

export async function register(
    prevState: RegisterState,
    formData: FormData,
) {
    const validateFields = RegisterSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        username: formData.get("username"),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Данные введены неправильно",
        };
    }

    const { email, password, username } = validateFields.data;


    const candidate = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (candidate) {
        return {
            errors: {
                email: ["Эта почта уже занята, попробуйте другую"],
            },
            message: "Неккоретные данные",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            name: username,
            email,
            password: hashedPassword,
        },
    });

    revalidatePath("/register");
    redirect("/");
}

export async function logout() {
    try {
        await signOut();
    } catch (error) {
        throw error;
    }
}