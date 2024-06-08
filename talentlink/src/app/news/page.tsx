import { addNew } from "@/actions/news";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import CreateNews from "../../components/forms/addNew";

export default async function News() {
  const news = await prisma.news.findMany();
  return (
    <div>
      <CreateNews news={news} />
      <Link href="/">
        <Button>Домой </Button>
      </Link>
    </div>
  );
}
