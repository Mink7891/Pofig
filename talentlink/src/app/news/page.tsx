import { addNew } from "@/actions/news";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function News() {
  const news = await prisma.news.findMany();
  return (
    <div>
      {news.map((item) => {
        return (
          <div
            key={item.NewID}
            className="border-2  border-slate-800 m-10 p-10 rounded-lg w-1/2"
          >
            <h1>{item.Header}</h1>
            <h3>{item.Category}</h3>
            <p>{item.Text}</p>
          </div>
        );
      })}
      <form action={addNew}>
        <input type="text" placeholder="Header" name="Header" />
        <input type="text" placeholder="Category" name="Category" />
        <input type="text" placeholder="Text" name="Text" />

        <Button>Отправить</Button>
      </form>
      <Link href="/">
        <Button>Домой </Button>
      </Link>
    </div>
  );
}
