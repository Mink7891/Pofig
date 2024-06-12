"use client";

import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { register } from "@/actions/auth";
import Link from "next/link";

export const RegisterForm = () => {
    const [errorMessage, dispatch] = useFormState(register, {
        errors: {
            username: undefined,
            email: undefined,
            password: undefined,
        },
        message: "",
    });

    console.log("Register Errors: ", errorMessage);

    return (
        <div className="flex justify-center items-center flex-col">
            <form action={dispatch} className="flex flex-col gap-3 p-5 rounded bg-slate-700 min-w-96">
                <h1>Регистрация</h1>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="p-1 rounded"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email:</label>

                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="p-1 rounded"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="p-1 rounded"
                    />
                </div>
                <Button>
                    Зарегистрироваться
                </Button>
                <Link href="/auth">Есть аккаунт?</Link>
            </form>
        </div>
    );
};