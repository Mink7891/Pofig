import { Button } from "@/components/ui/button";
// import "./globals.css";
import React from "react";
import Link from "next/link";

export default function ParallelLayout({
  children,
  analitics,
  notifications,
  resources,
}: Readonly<{
  children: React.ReactNode;
  analitics: React.ReactNode;
  notifications: React.ReactNode;
  resources: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <div className="flex-auto p-12 m-8 bg-red-100	">{analitics}</div>
        <div className="flex-auto p-12 m-8 bg-red-100	">{notifications}</div>
        <div className="flex-auto p-12 m-8 bg-red-100	">{resources}</div>
      </div>
      {children}
      <Link href="/">
        <Button>домой </Button>
      </Link>
    </>
  );
}
