import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Blog() {
  return (
    <>
      <h1>Blog page</h1>
      <Button>
        <Link href="/">Обратно</Link>
      </Button>
      <Button>
        <Link href="/blog/first">первый</Link>
      </Button>
      <Button>
        <Link href="/blog/second">Второй</Link>
      </Button>
    </>
  );
}
