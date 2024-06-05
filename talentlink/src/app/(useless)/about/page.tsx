import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <>
      <h1>about page</h1>

      <Link href="/">
        <Button>Обратно</Button>
      </Link>
    </>
  );
}
