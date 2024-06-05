import { Button } from "@/components/ui/button";
import Link from "next/link";

//ednf - expoer default named function

export default function Home() {
  return (
    <main className="">
      <h1>Здарова пацаны</h1>

      <Link href="/about">
        <Button>О нас </Button>
      </Link>

      {/* <a href="/blog">Блог</a> */}
      <Link href="/blog">
        <Button>Блог</Button>
      </Link>

      <Link href="/products">
        <Button>Товары </Button>
      </Link>
    </main>
  );
}
