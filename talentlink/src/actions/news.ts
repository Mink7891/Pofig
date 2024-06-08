"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addNew(e: FormData){
    const Header = e.get("Header")?.toString();
    const Category = e.get("Category")?.toString();
    const Text = e.get("Text")?.toString();

    console.log(`adding Header-${Header} category-${Category} text-${Text}--------------------`);
    await prisma.news.create({
        data: {
        Header,
        Category,
        Text,
        },
    });

    const news = await prisma.news.findMany();
    // console.log(news);
    revalidatePath('/news');
}