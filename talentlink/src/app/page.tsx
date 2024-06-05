import { Button } from "@/components/ui/button";
import Link from "next/link";

//ednf - expoer default named function

export default function Home() {
  return (
    <main className="">
      <h1>Здарова пацаны</h1>
      <Button>
        <Link href="/about">О нас</Link>
      </Button>
      <Button>
        <Link href="/blog">Блог</Link>
      </Button>
      <Button>
        <Link href="/products">Товары</Link>
      </Button>
    </main>
  );
}
