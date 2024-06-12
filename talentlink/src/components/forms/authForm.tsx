"use client";

import { authenticate } from "@/actions/auth";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    console.log("Error auth: ", errorMessage);

    return (
        <div className="flex justify-center items-center flex-col">
            <form action={dispatch} className="flex flex-col gap-3 p-5 rounded bg-slate-700 min-w-96">
                <h1>Авторизация</h1>
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
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <Button>Войти</Button>
                <Link href="/register">Нет аккаунта?</Link>
            </form>
        </div>
    );
}
