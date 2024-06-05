import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function First() {
  return (
    <>
      <h1>first Blog page</h1>
      <Button>
        <Link href="/blog">Обратно</Link>
      </Button>
    </>
  );
}
