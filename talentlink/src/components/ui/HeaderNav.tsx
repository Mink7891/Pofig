"use client";

import Link from "next/link";
import { useMemo } from "react";
import { logout } from "@/actions/auth";

interface Links {
    href: string;
    content: string;
}

interface HeaderNavProps {
    isAuthenticated?: boolean;
}

export const HeaderNav = (props: HeaderNavProps) => {
    const { isAuthenticated } = props;

    const links: Links[] = useMemo(() => (
        [
            {
                href: "/",
                content: "Главная",
            },
            {
                href: "/vakansii",
                content: "Вакансии",
            },
            {
                href: "/resume",
                content: "Резюме",
            },
            {
                href: "/news",
                content: "Новости",
            },
            {
                href: isAuthenticated ? "/profile" : "/auth",
                content: isAuthenticated ? "Профиль" : "Войти",
            },
        ]
    ), [isAuthenticated]);

    return (
        <div className="flex items-center">
            {links.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium transition-colors hover:text-primary my-3 mr-10 self-center"
                >
                    {link.content}
                </Link>
            ))}
            {isAuthenticated && (
                <form action={logout}>
                    <button>Выйти</button>
                </form>
            )}
        </div>
    );
};