"use server"

import { AddNewFormData } from "@/lib/formShemas";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Inputs = z.infer<typeof AddNewFormData>;

export async function addNew(formData: Inputs){
    // const Header = e.get("Header")?.toString();
    // const Category = e.get("Category")?.toString();
    // const Text = e.get("Text")?.toString();
    const Header = formData.Header;
    const Category = formData.Category;
    const Text = formData.Text;

    console.log(`adding Header-${formData.Header} category-${formData.Category} text-${formData.Text}--------------------`);
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
// export async function addNew(e: FormData){
//     const Header = e.get("Header")?.toString();
//     const Category = e.get("Category")?.toString();
//     const Text = e.get("Text")?.toString();

//     console.log(`adding Header-${Header} category-${Category} text-${Text}--------------------`);
//     await prisma.news.create({
//         data: {
//         Header,
//         Category,
//         Text,
//         },
//     });

//     const news = await prisma.news.findMany();
//     // console.log(news);
//     revalidatePath('/news');
// }