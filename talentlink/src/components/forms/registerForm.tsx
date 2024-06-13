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
            <form action={dispatch} className="flex flex-col gap-3 p-5 rounded bg-slate-700 w-96">
                <h1 className="font-bold text-lg">Регистрация</h1>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="p-1 rounded"
                    />
                    {errorMessage.errors?.username &&
                        <span className="mt-2 text-sm text-red-500">{errorMessage.errors.username}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Электронная почта:</label>

                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="p-1 rounded"
                    />

                    {errorMessage.errors?.email &&
                        <span className="mt-2 text-sm text-red-500">{errorMessage.errors.email}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="p-1 rounded"
                    />

                    {errorMessage.errors?.password &&
                        <span className="mt-2 text-sm text-red-500">{errorMessage.errors.password}</span>}
                </div>
                <Button>
                    Зарегистрироваться
                </Button>
                <Link href="/auth">Есть аккаунт?</Link>
            </form>
        </div>
    );
};