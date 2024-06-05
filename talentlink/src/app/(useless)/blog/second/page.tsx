import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Second() {
  return (
    <>
      <h1>second Blog page</h1>

      <Link href="/blog">
        <Button>Обратно</Button>
      </Link>
    </>
  );
}
