"use client";
import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
// import "@/app/globals.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let links = [
    { href: "/register", title: "Register" },
    { href: "/login", title: "Login" },
  ];
  let path = usePathname();
  let router = useRouter();

  let handler = () => {
    router.push("/");
  };
  return (
    <>
      {links.map((link) => {
        let isActive = path.includes(link.href);
        return (
          <Link href={link.href} key={link.title}>
            <Button className={isActive ? "font-black" : "font-normal"}>
              {link.title}
            </Button>
          </Link>
        );
      })}
      <Button onClick={handler}>на главную </Button>
      {/* <h1>{links[0].title}</h1> */}
      {children}
    </>
  );
}
