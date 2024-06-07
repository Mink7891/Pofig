import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Blog() {
  // let theme = cookies().get("theme");
  // console.log(theme);

  return (
    <>
      <h1>Blog page</h1>
      <Link href="/">
        <Button>Обратно</Button>
      </Link>

      <Link href="/blog/first">
        <Button>первый </Button>
      </Link>

      <Link href="/blog/second">
        <Button>Второй</Button>
      </Link>
    </>
  );
}
